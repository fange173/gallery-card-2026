import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const GalleryCardVersion = "2026.0.1";
const ValidMenuAlignments = new Set(["responsive", "right", "left", "bottom", "top", "hidden"]);
const WeekdayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

class GalleryCard extends LitElement {
  static get properties() {
    // hass is intentionally not reactive: HA sets it on every state change, and only camera
    // thumbnails depend on it, so `set hass` requests an update only when those cameras change.
    return {
      config: {},
      resources: { type: Array },
      currentResourceIndex: { type: Number },
      selectedDate: { type: Object },
      _itemsToShow: { type: Number },
      _isDateFiltered: { type: Boolean },
      _isLoading: { type: Boolean },
      _isModalOpen: { type: Boolean },
      _slideshowRunning: { type: Boolean },
      _mediaAspect: { type: Number },
      _previewErrorIndex: { type: Number },
      errors: { type: Array }
    };
  }

  constructor() {
    super();
    this.resources = undefined;
    this.currentResourceIndex = 0;
    this._itemsToShow = 10;
    this.selectedDate = null;
    this._isDateFiltered = false;
    this._isLoading = false;
    this._isModalOpen = false;
    this._slideshowRunning = false;
    this._previewErrorIndex = undefined;
    this.errors = [];
    this._hasKeyNavigationListener = false;
    this._keyNavigationHandler = event => this._keyNavigation(event);
    // touchstart only records the start point, so it can be passive; touchmove may cancel scrolling.
    this._touchStartListener = { handleEvent: event => this._handleTouchStart(event), passive: true };
    this._touchMoveListener = event => this._handleTouchMove(event);
    this._mediaResolveCache = new Map();
    this._mediaResolveInflight = new Map();
    this._queuedResolveIds = new Map();
    this._mediaResolveCacheMs = 2.5 * 60 * 60 * 1000;
    this._mediaBrowseCache = new Map();
    this._mediaBrowseInflight = new Map();
    this._browseCacheGeneration = 0;
    this._loadToken = 0;
    this._pendingLoadRequested = false;
    this._slideshowTimer = undefined;
    this._cameraEntityIds = [];
    this._viewerPointers = new Map();
    this._viewerGesture = undefined;
    this._zoom = { scale: 1, x: 0, y: 0 };
    this._lastViewerTap = 0;
    this._suppressViewerClickUntil = 0;
  }

  render() {
    if (!this.config) return html``;

    const resources = this.resources || [];
    const currentResource = resources.length > 0 ? this._currentResource() : undefined;
    const heightClass = this.config.height === "auto" ? "height-auto" : "height-fill";
    const mediaAspect = typeof this.config.aspect_ratio === "number" ? this.config.aspect_ratio : this._mediaAspect;
    const cardStyle = [
      this.config.height === "auto" || this.config.height === "viewport" ? "" : `--gallery-card-height: ${this.config.height};`,
      mediaAspect ? `--gallery-media-aspect: ${mediaAspect};` : ""
    ].join(" ");
    // The info bar lives in the timeline column so it never covers the picture; without a timeline it sits under the preview.
    const infoBarInStage = this.config.menu_alignment === "hidden";

    return html`
      <ha-card class="menu-${this.config.menu_alignment} ${heightClass}" style="${cardStyle}">
        <section class="stage">
          ${this._renderStage(currentResource)}
          ${infoBarInStage ? this._renderInfoBar(currentResource) : html``}
        </section>
        <aside class="timeline">
          ${infoBarInStage ? html`` : this._renderInfoBar(currentResource)}
          ${this._renderDateChips()}
          ${this.errors.length > 0 ? html`<div class="error-list" role="status">
            ${this.errors.map(error => html`<hui-warning>${error}</hui-warning>`)}
          </div>` : html``}
          <div class="resource-menu ${this._isTimelineGrouped(resources) ? "grouped" : ""}">
            ${this._isLoading ? this._renderMenuLoadingState() : resources.length === 0 ? html`<div class="menu-empty">${this._isDateFiltered ? "这一天没有记录" : "暂无媒体"}</div>` : this._renderTimelineItems(resources)}
            ${!this._isLoading && this._itemsToShow < resources.length ?
        html`<button type="button" class="load-more" @click="${this._loadMore}">加载更多（还有 ${resources.length - this._itemsToShow} 项）</button>` :
        html``
      }
          </div>
        </aside>
        ${this._renderViewer(currentResource)}
      </ha-card>
    `;
  }

  _renderStage(resource) {
    const resources = this.resources || [];
    const errorHint = this.config.show_reload ? "媒体加载失败，请点击刷新后重试" : "媒体加载失败，请检查媒体来源";
    let content;

    if (this._isLoading) {
      content = this._renderLoadingState("正在加载媒体...");
    } else if (!resource) {
      content = this.errors.length > 0 ? this._renderEmptyState(errorHint) :
        this._isDateFiltered ? this._renderEmptyState("这一天没有记录", html`<button type="button" class="empty-action" @click="${() => this._setDateFilter(null)}">查看全部</button>`) :
          this._renderEmptyState("还没有图片或视频");
    } else if (resource.resolveError || this._previewErrorIndex === this.currentResourceIndex) {
      content = this._renderErrorState(errorHint);
    } else if (resource.pendingAuth) {
      content = this._renderLoadingState("正在加载预览...");
    } else if (resource.isHass) {
      content = html`<hui-image @click="${() => this._popupCamera()}"
        .hass=${this._hass}
        .cameraImage=${resource.name}
        .cameraView=${"live"}
        .fitMode=${"contain"}
      ></hui-image>`;
    } else if (this._isImageResource(resource)) {
      content = html`<img class="preview-image" @click="${() => this._openViewer()}" @load="${event => this._updateMediaAspect(event.target.naturalWidth, event.target.naturalHeight)}" @error="${() => this._handlePreviewError()}" src="${resource.url}" alt="${resource.caption || resource.name}"/>`;
    } else {
      content = html`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay && !this._isModalOpen} .muted=${Boolean(this.config.video_muted)} src="${resource.url}#t=0.1" @error="${() => this._handlePreviewError()}" @loadedmetadata="${event => this._videoMetadataLoaded(event)}" @canplay="${event => this._startVideo(event)}"
        @ended="${() => this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`;
    }

    return html`
      <div class="resource-viewer" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
        <figure>${content}</figure>
        ${!this._isLoading && resources.length > 1 ? html`<div class="viewer-nav">
          <button type="button" class="nav-icon-btn nav-left" @click="${() => this._selectResource(this.currentResourceIndex - 1)}" aria-label="上一个" title="上一个">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <button type="button" class="nav-icon-btn nav-right" @click="${() => this._selectResource(this.currentResourceIndex + 1)}" aria-label="下一个" title="下一个">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>` : html``}
      </div>
    `;
  }

  _renderInfoBar(resource) {
    const total = (this.resources || []).length;
    const hasMedia = !this._isLoading && Boolean(resource);
    const caption = hasMedia ? this._getResourceTitle(resource) : "";
    const relativeTime = hasMedia && resource.date ? this._formatRelativeTime(resource.date) : "";

    return html`
      <div class="info-bar">
        <div class="info-text ${caption ? "has-caption" : ""}">
          ${this.config.title ? html`<span class="info-title">${this.config.title}</span>` : html``}
          ${caption ? html`<span class="info-caption">${caption}</span>` : html``}
          ${relativeTime ? html`<span class="info-relative">${relativeTime}</span>` : html``}
        </div>
        <div class="info-actions">
          ${hasMedia && total > 1 ? html`<span class="info-counter">${this.currentResourceIndex + 1} / ${total}</span>` : html``}
          ${hasMedia && total > 1 && this._hasSlideshowTimer() ? html`<button type="button" class="icon-button" @click="${this._toggleSlideshow}" aria-pressed="${this._slideshowRunning ? "true" : "false"}" aria-label="${this._slideshowRunning ? "暂停幻灯片" : "继续幻灯片"}" title="${this._slideshowRunning ? "暂停幻灯片" : "继续幻灯片"}">
            <ha-icon icon="${this._slideshowRunning ? "mdi:pause-box-outline" : "mdi:play-box-multiple-outline"}"></ha-icon>
          </button>` : html``}
          ${hasMedia ? this._renderDownloadButton(resource) : html``}
          ${hasMedia ? html`<button type="button" class="icon-button" @click="${() => this._openViewer()}" aria-label="全屏查看" title="全屏查看">
            <ha-icon icon="mdi:fullscreen"></ha-icon>
          </button>` : html``}
          ${this.config.show_reload ? html`<button type="button" class="icon-button btn-reload" @click="${this._reloadResources}" ?disabled=${this._isLoading} aria-label="刷新媒体" title="刷新媒体">
            <ha-icon class="${this._isLoading ? "spinning" : ""}" icon="mdi:refresh"></ha-icon>
          </button>` : html``}
        </div>
      </div>
    `;
  }

  _renderDownloadButton(resource) {
    if (resource.isHass || resource.pendingAuth || !resource.url) return html``;

    const fileName = resource.extension ? `${resource.name}.${resource.extension}` : resource.name;

    return html`<a class="icon-button" href="${resource.url}" download="${fileName}" target="_blank" rel="noopener" aria-label="下载" title="下载">
      <ha-icon icon="mdi:download"></ha-icon>
    </a>`;
  }

  _renderDateChips() {
    if (!this.config.enable_date_search) return html``;

    const today = dayjs().startOf("day");
    const selected = this._isDateFiltered && this.selectedDate ? dayjs(this.selectedDate) : undefined;
    const isToday = Boolean(selected?.isSame(today, "day"));
    const isYesterday = Boolean(selected?.isSame(today.subtract(1, "day"), "day"));
    const isCustom = Boolean(selected) && !isToday && !isYesterday;
    const chip = (label, active, date) => html`<button type="button" class="chip ${active ? "active" : ""}" aria-pressed="${active ? "true" : "false"}" @click="${() => this._setDateFilter(date)}">${label}</button>`;

    return html`
      <div class="date-chips" role="toolbar" aria-label="按日期筛选">
        ${chip("全部", !selected, null)}
        ${chip("今天", isToday, today)}
        ${chip("昨天", isYesterday, today.subtract(1, "day"))}
        <label class="chip chip-date ${isCustom ? "active" : ""}">
          <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
          <span>${isCustom ? this._formatMonthDay(selected) : "日期"}</span>
          <input type="date" class="date-picker" aria-label="选择日期" .value="${this._formatDateForInput(this.selectedDate)}" @click="${this._openDatePicker}" @change="${this._handleDateChange}">
        </label>
      </div>
    `;
  }

  // Random order would scatter days into many tiny groups, so only a dated, ordered list is grouped.
  _isTimelineGrouped(resources) {
    return !this._isLoading && !(this.config.random_sort ?? false) && resources.slice(0, this._itemsToShow).some(resource => resource.date);
  }

  _renderTimelineItems(resources) {
    const visibleResources = resources.slice(0, this._itemsToShow);
    const groupByDay = this._isTimelineGrouped(resources);
    const dayCounts = groupByDay ? this._countResourcesByDay(resources) : undefined;
    const items = [];
    let previousGroup;

    visibleResources.forEach((resource, index) => {
      if (groupByDay) {
        const group = this._getDayGroupKey(resource);

        if (group !== previousGroup) {
          items.push({ key: `day:${index}:${group}`, group, resource });
          previousGroup = group;
        }
      }
      // Keyed by position and identity so lazily assigned src values never leak onto another resource.
      items.push({ key: `${index}:${this._getResourceKey(resource)}`, resource, index });
    });

    return repeat(items, item => item.key, item => item.group ?
      this._renderDayHeader(item.group, item.resource, dayCounts) :
      this._renderThumbnail(item.resource, item.index, groupByDay));
  }

  _renderDayHeader(group, resource, dayCounts) {
    const [name, date] = group === "camera" ? ["摄像头", ""] : group === "other" ? ["其他", ""] : this._getDayLabelParts(resource.date);

    return html`
      <div class="day-header">
        <span class="day-label"><span class="day-name">${name}</span>${date ? html`<span class="day-date">${date}</span>` : html``}</span>
        <span class="day-count">${dayCounts.get(group)}</span>
      </div>
    `;
  }

  _renderThumbnail(resource, index, groupByDay) {
    const label = resource.caption || resource.name || `媒体 ${index + 1}`;
    const tooltip = this._getResourceTooltip(resource) || label;
    const isSelected = index === this.currentResourceIndex;
    const isVideo = !resource.isHass && !this._isImageResource(resource);
    const showDuration = isVideo && (this.config.show_duration ?? true);
    const minutesAgo = resource.date ? dayjs().diff(resource.date, "minute") : -1;
    // Day headers already carry the date, so grouped items only need their time.
    const thumbnailLabel = this.config.caption_format === " " ? "" :
      groupByDay && resource.date && !resource.isHass ? resource.date.format("HH:mm") : resource.caption;

    return html`
      <figure id="resource${index}" class="thumb ${isSelected ? "selected" : ""}" @click="${() => this._selectResource(index)}" @keydown="${event => this._handleResourceKeydown(event, index)}" tabindex="0" role="button" aria-current="${isSelected ? "true" : "false"}" aria-label="${label}" title="${tooltip}">
        <div class="thumb-media">
          ${this._renderThumbnailMedia(resource, index)}
          ${isVideo ? html`<span class="video-badge"><ha-icon icon="mdi:play"></ha-icon>${showDuration ? html`<span class="duration"></span>` : html``}</span>` : html``}
          ${minutesAgo >= 0 && minutesAgo < 60 ? html`<span class="new-dot" title="一小时内的新记录"></span>` : html``}
        </div>
        ${thumbnailLabel ? html`<figcaption>${thumbnailLabel}</figcaption>` : html``}
      </figure>
    `;
  }

  _renderThumbnailMedia(resource, index) {
    const isVideo = !resource.isHass && !this._isImageResource(resource);

    if (resource.pendingAuth) {
      return html`<div class="thumbnail-loading" data-resource-index="${index}">
        <div class="skeleton-media"></div>
      </div>`;
    }
    if (resource.resolveError || resource.thumbnailError) {
      return html`<div class="thumbnail-error">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>加载失败</span>
      </div>`;
    }
    if (resource.isHass) {
      return html`<hui-image
        .hass=${this._hass}
        .cameraImage=${resource.name}
        .cameraView=${"auto"}
        .fitMode=${"cover"}
      ></hui-image>`;
    }
    if (!isVideo) {
      return html`<img class="lzy_img" data-src="${resource.url}" @error="${() => this._handleThumbnailError(resource)}" alt="" decoding="async" draggable="false"/>`;
    }
    if (this.config.video_preload ?? true) {
      return html`<video class="lzy_video" preload="metadata" data-src="${resource.url}#t=${(this.config.preview_video_at === undefined) ? 0.1 : this.config.preview_video_at}" @error="${() => this._handleThumbnailError(resource)}" @loadedmetadata="${event => this._videoMetadataLoaded(event)}" muted playsinline></video>`;
    }
    return html`<div class="video-placeholder"><ha-icon icon="mdi:movie-play-outline"></ha-icon></div>`;
  }

  _renderViewer(resource) {
    const resources = this.resources || [];
    const showContent = this._isModalOpen && resource;
    const relativeTime = showContent && resource.date ? this._formatRelativeTime(resource.date) : "";

    return html`
      <dialog class="viewer" @close="${this._handleModalClosed}" @cancel="${this._handleModalClosed}">
        ${showContent ? html`
          <div class="viewer-top">
            <button type="button" class="icon-button" @click="${this._closeViewer}" aria-label="关闭" title="关闭"><ha-icon icon="mdi:close"></ha-icon></button>
            <div class="viewer-title">
              <span class="info-caption">${this._getResourceTitle(resource)}</span>
              ${relativeTime ? html`<span class="info-relative">${relativeTime}</span>` : html``}
            </div>
            ${resources.length > 1 ? html`<span class="info-counter">${this.currentResourceIndex + 1} / ${resources.length}</span>` : html``}
            ${this._renderDownloadButton(resource)}
          </div>
          <div class="viewer-stage"
            @pointerdown="${this._handleViewerPointerDown}"
            @pointermove="${this._handleViewerPointerMove}"
            @pointerup="${this._handleViewerPointerUp}"
            @pointercancel="${this._handleViewerPointerUp}"
            @wheel="${this._handleViewerWheel}"
            @click="${this._handleViewerStageClick}">
            <div class="zoom-layer">${this._renderViewerMedia(resource)}</div>
            ${resources.length > 1 ? html`<div class="viewer-nav">
              <button type="button" class="nav-icon-btn" @click="${() => this._selectResource(this.currentResourceIndex - 1)}" aria-label="上一个" title="上一个"><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <button type="button" class="nav-icon-btn" @click="${() => this._selectResource(this.currentResourceIndex + 1)}" aria-label="下一个" title="下一个"><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>` : html``}
          </div>
          ${resources.length > 1 ? html`<div class="viewer-strip">${this._renderViewerStrip()}</div>
            <div class="strip-tooltip" role="tooltip" hidden></div>` : html``}
        ` : html``}
      </dialog>
    `;
  }

  _renderViewerMedia(resource) {
    if (resource.pendingAuth) return this._renderLoadingState("正在加载...");
    if (resource.resolveError) return this._renderErrorState("媒体加载失败");
    if (resource.isHass) {
      return html`<hui-image class="viewer-media" .hass=${this._hass} .cameraImage=${resource.name} .cameraView=${"auto"} .fitMode=${"contain"}></hui-image>`;
    }
    if (this._isImageResource(resource)) {
      return html`<img class="viewer-media" src="${resource.url}" alt="${resource.caption || resource.name}" draggable="false">`;
    }
    return html`<video class="viewer-media" controls autoplay .muted=${Boolean(this.config.video_muted)} ?loop=${this.config.video_loop} src="${resource.url}" playsinline webkit-playsinline></video>`;
  }

  _renderViewerStrip() {
    const resources = this.resources || [];
    const current = this.currentResourceIndex;
    // Only a window around the current item: the strip must stay light for galleries with thousands of items.
    const showDays = !(this.config.random_sort ?? false) && resources.some(resource => resource.date);
    const entries = [];
    let previousGroup;

    for (let index = Math.max(0, current - 15); index < Math.min(resources.length, current + 16); index++) {
      const group = showDays ? this._getDayGroupKey(resources[index]) : undefined;

      // A day label starts the strip and marks every change of day.
      if (showDays && group !== previousGroup) {
        entries.push({ key: `day:${index}:${group}`, group, resource: resources[index] });
        previousGroup = group;
      }
      entries.push({ key: `${index}:${this._getResourceKey(resources[index])}`, index });
    }

    return repeat(entries, entry => entry.key, entry => entry.group ? this._renderStripDay(entry.group, entry.resource) : this._renderStripItem(entry.index));
  }

  _renderStripDay(group, resource) {
    const [name, date] = group === "camera" ? ["摄像头", ""] : group === "other" ? ["其他", ""] : [this._getDayLabelParts(resource.date)[0], resource.date.format("M/D")];

    return html`
      <div class="strip-day" aria-hidden="true">
        <span>${name}</span>
        ${date ? html`<span class="strip-day-date">${date}</span>` : html``}
      </div>
    `;
  }

  _renderStripItem(index) {
    const resources = this.resources;
    const current = this.currentResourceIndex;

    return html`
      <button type="button" id="strip${index}" class="strip-item ${index === current ? "selected" : ""}"
        @click="${() => this._handleStripClick(index)}"
        @pointerenter="${event => this._handleStripPointerEnter(event, index)}"
        @pointerdown="${event => this._handleStripPointerDown(event, index)}"
        @pointerup="${this._handleStripPointerUp}"
        @pointerleave="${this._hideStripTooltip}"
        @pointercancel="${this._hideStripTooltip}"
        @contextmenu="${event => event.preventDefault()}"
        aria-label="${this._getResourceTooltip(resources[index]) || resources[index].caption || resources[index].name}" aria-current="${index === current ? "true" : "false"}">
        ${this._renderThumbnailMedia(resources[index], index)}
      </button>
    `;
  }

  _renderLoadingState(label) {
    return html`
      <div class="loading-state" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <div class="loading-label">${label}</div>
      </div>
    `;
  }

  _renderEmptyState(label, action) {
    return html`
      <div class="empty-state">
        <ha-icon icon="mdi:image-off-outline"></ha-icon>
        <div class="empty-label">${label}</div>
        ${action || html``}
      </div>
    `;
  }

  _renderErrorState(label) {
    return html`
      <div class="empty-state error-state" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <div class="empty-label">${label}</div>
      </div>
    `;
  }

  _renderMenuLoadingState() {
    const count = Math.min(this._itemsToShow || 10, 10);

    return Array.from({ length: count }, () => html`
      <figure class="thumb resource-skeleton" aria-hidden="true">
        <div class="thumb-media"><div class="skeleton-media"></div></div>
        <div class="skeleton-caption"></div>
      </figure>
    `);
  }

  // Full date and time (with relative time) for tooltips; falls back to the caption for undated items.
  _getResourceTooltip(resource) {
    if (!resource?.date) return resource?.caption || "";

    const relativeTime = this._formatRelativeTime(resource.date);

    return `${this._formatMonthDay(resource.date)} ${resource.date.format("HH:mm:ss")}${relativeTime ? ` · ${relativeTime}` : ""}`;
  }

  _getResourceTitle(resource) {
    if (resource.caption) return resource.caption;
    if (resource.date) return resource.date.format("M月D日 HH:mm:ss");
    return resource.name;
  }

  _getDayGroupKey(resource) {
    if (resource.isHass) return "camera";
    return resource.date ? resource.date.format("YYYY-MM-DD") : "other";
  }

  _countResourcesByDay(resources) {
    const counts = new Map();

    for (const resource of resources) {
      const group = this._getDayGroupKey(resource);

      counts.set(group, (counts.get(group) || 0) + 1);
    }
    return counts;
  }

  _formatMonthDay(date) {
    const day = dayjs(date);

    return day.year() === dayjs().year() ? day.format("M月D日") : day.format("YYYY年M月D日");
  }

  // [relative day or weekday, month and day], e.g. ["今天", "10月21日"] or ["周日", "10月19日"].
  _getDayLabelParts(date) {
    const day = dayjs(date).startOf("day");
    const daysAgo = dayjs().startOf("day").diff(day, "day");
    const name = daysAgo === 0 ? "今天" : daysAgo === 1 ? "昨天" : WeekdayNames[day.day()];

    return [name, this._formatMonthDay(day)];
  }

  _formatRelativeTime(date) {
    const now = dayjs();
    const minutes = now.diff(date, "minute");

    if (minutes < 0) return "";
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes} 分钟前`;
    if (minutes < 24 * 60) return `${Math.floor(minutes / 60)} 小时前`;

    const days = now.startOf("day").diff(dayjs(date).startOf("day"), "day");

    if (days === 1) return "昨天";
    if (days < 7) return `${days} 天前`;
    return "";
  }

  connectedCallback() {
    super.connectedCallback();
    this._createImageObserver();
    // Dashboards detach and re-attach cards when switching views; restore what disconnectedCallback tore down.
    if (this.resources !== undefined) this._addKeyNavigationListener();
    if (this.config) this._doSlideShow(true);
    // Keeps "3 分钟前" labels and new-item dots current while the page stays open.
    this._clockTimer ??= setInterval(() => this.requestUpdate(), 60 * 1000);
    this.requestUpdate();
  }

  updated() {
    this._createImageObserver();
    const lazyElements = this.shadowRoot.querySelectorAll("img.lzy_img[data-src], video.lzy_video[data-src], .thumbnail-loading[data-resource-index]");

    for (const element of lazyElements) this.imageObserver.observe(element);

    // Re-observing after every update makes the observer report again, so a "load more" button that is
    // still visible after a page of thumbnails keeps loading until the list fills its scroll area.
    this._loadMoreObserver ??= new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) this._loadMore();
    });
    this._loadMoreObserver.disconnect();
    const loadMoreButton = this.shadowRoot.querySelector(".load-more");

    if (loadMoreButton) this._loadMoreObserver.observe(loadMoreButton);
  }

  _createImageObserver() {
    if (this.imageObserver) return;

    this.imageObserver = new IntersectionObserver((entries) => {
      const pendingResources = [];

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const lazyMedia = entry.target;

          if (lazyMedia.dataset.resourceIndex !== undefined) {
            const resourceIndex = Number.parseInt(lazyMedia.dataset.resourceIndex);
            const resource = this.resources?.[resourceIndex];

            if (resource?.pendingAuth && resource.mediaContentId) pendingResources.push(resource);
          } else if (lazyMedia.dataset.src) {
            lazyMedia.src = lazyMedia.dataset.src;
            if (lazyMedia.tagName === 'VIDEO') {
              lazyMedia.load();
            }
            delete lazyMedia.dataset.src;
          }
          this.imageObserver.unobserve(lazyMedia);
        }
      }

      if (pendingResources.length > 0) {
        const pendingById = new Map(pendingResources.map(resource => [resource.mediaContentId, resource]));

        this._resolvePendingResourceBatch([...pendingById.values()], this._hass, this._loadToken);
      }
    });
  }

  setConfig(config) {
    if (!config || (!config.entity && !config.entities)) {
      throw new Error("Required configuration for entities is missing");
    }

    const configuredEntities = Array.isArray(config.entities) ? config.entities : (config.entities ? [config.entities] : []);
    const entities = configuredEntities.map(entity => typeof entity === "object" ? { ...entity } : entity);

    if (config.entity) entities.push(config.entity);
    if (entities.length === 0) throw new Error("At least one entity or media source is required");

    const menuAlignment = String(config.menu_alignment || "responsive").toLowerCase();
    const itemsPerPage = Number.parseInt(config.items_per_page);
    const browseCacheSeconds = Number(config.browse_cache_seconds);
    const mediaCacheSize = Number.parseInt(config.media_cache_size);
    const resolveConcurrency = Number.parseInt(config.resolve_concurrency);
    const dateSearchAdjacentDays = Number.parseInt(config.date_search_adjacent_days);
    const slideshowSeconds = Number.parseInt(config.slideshow_timer);
    const previousEntities = JSON.stringify(this.config?.entities || []);
    const configWithoutEntity = { ...config };

    delete configWithoutEntity.entity;

    this.config = {
      ...configWithoutEntity,
      entities,
      menu_alignment: ValidMenuAlignments.has(menuAlignment) ? menuAlignment : "responsive",
      items_per_page: Number.isFinite(itemsPerPage) && itemsPerPage > 0 ? itemsPerPage : 10,
      browse_cache_seconds: Number.isFinite(browseCacheSeconds) && browseCacheSeconds >= 0 ? browseCacheSeconds : 20,
      media_cache_size: Number.isFinite(mediaCacheSize) && mediaCacheSize > 0 ? mediaCacheSize : 500,
      resolve_concurrency: Number.isFinite(resolveConcurrency) && resolveConcurrency > 0 ? Math.min(resolveConcurrency, 8) : 4,
      date_search_adjacent_days: Number.isFinite(dateSearchAdjacentDays) && dateSearchAdjacentDays >= 0 ? Math.min(dateSearchAdjacentDays, 7) : 1,
      height: this._normalizeHeight(config.height),
      aspect_ratio: this._normalizeAspectRatio(config.aspect_ratio)
    };
    this._slideshowRunning = Number.isFinite(slideshowSeconds) && slideshowSeconds > 0;
    this._mediaAspect = this._readStoredMediaAspect();
    this._mediaAspectMeasured = false;
    if (previousEntities !== JSON.stringify(entities)) this._clearBrowseCache();
    this._itemsToShow = this.config.items_per_page;
    this._previewErrorIndex = undefined;

    if (this._hass !== undefined)
      this._loadResources(this._hass);

    this._doSlideShow(true);
  }

  // "viewport" (default) fills the screen below the header, as a dashboard page; "auto" sizes to content
  // for use as a regular card; anything else is a CSS length such as 600 or "80vh".
  _normalizeHeight(height) {
    if (typeof height === "number" && height > 0) return `${height}px`;

    const value = String(height ?? "").trim();

    if (!value || value.toLowerCase() === "viewport") return "viewport";
    if (value.toLowerCase() === "auto") return "auto";
    if (/^\d+(\.\d+)?$/.test(value)) return `${value}px`;
    return /^[\w\s().%+*/-]+$/.test(value) ? value : "viewport";
  }

  // "auto" (default) follows the current media; "4:3", "16/9" or a number fixes the preview ratio.
  _normalizeAspectRatio(aspectRatio) {
    const match = String(aspectRatio ?? "").trim().match(/^(\d+(?:\.\d+)?)\s*(?:[:/]\s*(\d+(?:\.\d+)?))?$/);
    const ratio = match ? Number(match[1]) / Number(match[2] || 1) : Number.NaN;

    return Number.isFinite(ratio) && ratio > 0 ? Math.min(Math.max(ratio, 0.5), 2.4) : "auto";
  }

  set hass(hass) {
    const previousHass = this._hass;

    this._hass = hass;
    if (!this.config) return;

    if (this.resources === undefined)
      this._loadResources(hass);
    else if (this._haveCameraStatesChanged(previousHass, hass))
      this.requestUpdate();
  }

  get hass() {
    return this._hass;
  }

  _haveCameraStatesChanged(previousHass, hass) {
    return this._cameraEntityIds.some(entityId => previousHass?.states[entityId] !== hass?.states[entityId]);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeKeyNavigationListener();
    this._clearSlideshowTimer();
    this._closeViewer();
    clearInterval(this._clockTimer);
    this._clockTimer = undefined;
    this.imageObserver?.disconnect();
    this._loadMoreObserver?.disconnect();
  }

  getCardSize() {
    return 12;
  }

  getGridOptions() {
    return {
      columns: "full",
      min_columns: 6
    };
  }

  static getStubConfig() {
    return {
      entities: [{ path: "media-source://media_source/local", recursive: true }],
      menu_alignment: "responsive"
    };
  }

  _isImageExtension(extension) {
    return typeof extension === "string" && /^(?:jpeg|jpg|gif|png|tiff|bmp|webp|avif)$/i.test(extension);
  }

  _isImageResource(resource) {
    if (resource?.mediaType) return resource.mediaType === "image";
    return this._isImageExtension(resource?.extension);
  }

  _getResourceKey(resource) {
    return resource?.mediaContentId || resource?.url || "";
  }

  _patchResource(resource, changes) {
    const key = this._getResourceKey(resource);

    if (!key || !this.resources) return;
    this.resources = this.resources.map(item => this._getResourceKey(item) === key ? { ...item, ...changes } : item);
  }

  _doSlideShow(firstTime) {
    this._clearSlideshowTimer();
    if (!this._slideshowRunning) return;

    if (!firstTime && !this._isPreviewVideoPlaying())
      this._selectResource(this.currentResourceIndex + 1, true);

    if (this.isConnected && this._hasSlideshowTimer()) {
      this._slideshowTimer = setTimeout(() => { this._doSlideShow(); }, Number.parseInt(this.config.slideshow_timer) * 1000);
    }
  }

  // The slideshow control only appears when slideshow_timer is configured.
  _hasSlideshowTimer() {
    const seconds = Number.parseInt(this.config?.slideshow_timer);

    return Number.isFinite(seconds) && seconds > 0;
  }

  _toggleSlideshow() {
    this._slideshowRunning = !this._slideshowRunning;
    this._doSlideShow(true);
  }

  _isPreviewVideoPlaying() {
    if (!this.config.slideshow_video_end) return false;

    const video = this.shadowRoot?.querySelector(".resource-viewer video");

    return Boolean(video && !video.paused && !video.ended);
  }

  _clearSlideshowTimer() {
    if (!this._slideshowTimer) return;

    clearTimeout(this._slideshowTimer);
    this._slideshowTimer = undefined;
  }

  _loadMore() {
    const step = this.config.items_per_page;

    this._itemsToShow = Math.min(this._itemsToShow + step, this.resources.length);
  }

  _selectResource(index, fromSlideshow) {
    this.autoPlayVideo = true;

    if (!this.resources || this.resources.length === 0) return;

    let nextResourceIndex = Number.isFinite(index) ? index : 0;

    if (nextResourceIndex < 0)
      nextResourceIndex = this.resources.length - 1;
    else if (nextResourceIndex >= this.resources.length)
      nextResourceIndex = 0;

    // 如果选中的索引超出了当前显示范围，自动加载更多
    if (nextResourceIndex >= this._itemsToShow) {
      this._itemsToShow = Math.min(nextResourceIndex + this.config.items_per_page, this.resources.length);
    }

    this.currentResourceIndex = nextResourceIndex;
    this._previewErrorIndex = undefined;
    const selectedResource = this.resources[this.currentResourceIndex];

    if ((selectedResource.resolveError || selectedResource.thumbnailError) && selectedResource.mediaContentId) {
      this._mediaResolveCache.delete(selectedResource.mediaContentId);
      this._patchResource(selectedResource, {
        pendingAuth: true,
        resolveError: false,
        thumbnailError: false
      });
    } else if (selectedResource.thumbnailError) {
      // Plain file URLs can't be re-resolved; just let the thumbnail try loading again.
      this._patchResource(selectedResource, { thumbnailError: false });
    }
    this._resolveResourceUrl(this.resources[this.currentResourceIndex]);
    // Resolve the neighbours too, so the next arrow press, swipe or slide shows without waiting.
    this._resolveResourceUrl(this.resources[(nextResourceIndex + 1) % this.resources.length]);
    this._resolveResourceUrl(this.resources[(nextResourceIndex - 1 + this.resources.length) % this.resources.length]);

    // Manual navigation restarts the countdown so the slideshow doesn't skip right after a user choice.
    if (!fromSlideshow && this._slideshowTimer) this._doSlideShow(true);

    const selectedIndex = this.currentResourceIndex;

    this._resetZoom();
    this.updateComplete.then(() => {
      this._scrollThumbnailIntoView(selectedIndex);
      this._scrollStripItemIntoView(selectedIndex);
    });
  }

  // Scrolls only the thumbnail list itself; Element.scrollIntoView would also scroll the dashboard,
  // which on mobile pushes the preview off-screen on every navigation.
  _scrollThumbnailIntoView(index) {
    if (index !== this.currentResourceIndex) return;
    this._scrollWithin(this.shadowRoot?.querySelector(".resource-menu"), this.shadowRoot?.querySelector(`#resource${index}`));
  }

  // Keeps the current item centered in the viewer's filmstrip.
  _scrollStripItemIntoView(index) {
    const strip = this.shadowRoot?.querySelector(".viewer-strip");
    const item = this.shadowRoot?.querySelector(`#strip${index}`);

    if (index !== this.currentResourceIndex || !this._isModalOpen || !strip || !item) return;

    const stripRect = strip.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const offset = itemRect.left + itemRect.width / 2 - (stripRect.left + stripRect.width / 2);

    if (Math.abs(offset) > 1) strip.scrollTo({ left: strip.scrollLeft + offset, behavior: "smooth" });
  }

  _scrollWithin(container, element) {
    if (!container || !element) return;

    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    // Leave room for the sticky day header (above the item in lists, left of it in filmstrips).
    const stickyHeader = container.querySelector(".day-header");
    const margin = 12;
    const topMargin = (stickyHeader?.offsetHeight ?? 0) + margin;
    const leftMargin = (stickyHeader?.offsetWidth ?? 0) + margin;
    let top = container.scrollTop;
    let left = container.scrollLeft;

    if (container.scrollHeight > container.clientHeight) {
      if (elementRect.top < containerRect.top + topMargin) top += elementRect.top - containerRect.top - topMargin;
      else if (elementRect.bottom > containerRect.bottom) top += elementRect.bottom - containerRect.bottom + margin;
    }
    if (container.scrollWidth > container.clientWidth) {
      if (elementRect.left < containerRect.left + leftMargin) left += elementRect.left - containerRect.left - leftMargin;
      else if (elementRect.right > containerRect.right) left += elementRect.right - containerRect.right + margin;
    }

    if (top !== container.scrollTop || left !== container.scrollLeft)
      container.scrollTo({ top, left, behavior: "smooth" });
  }

  _currentResource() {
    return this.resources?.[this.currentResourceIndex];
  }

  // The preview is sized from the first media measured after each config (at least 1:1), so mixed ratios
  // don't reflow on every item. The value is remembered per source so the next page load starts at the
  // right size instead of jumping once the video loads. A configured aspect_ratio takes precedence.
  _updateMediaAspect(width, height) {
    if (this._mediaAspectMeasured || !width || !height) return;

    const aspect = Math.round(Math.min(Math.max(width / height, 1), 2.4) * 1000) / 1000;

    this._mediaAspectMeasured = true;
    if (this._mediaAspect && Math.abs(this._mediaAspect - aspect) <= 0.01) return;

    this._mediaAspect = aspect;
    try {
      localStorage.setItem(this._getAspectStorageKey(), String(aspect));
    } catch {
      // Storage can be unavailable (private mode); the ratio is then measured on each load.
    }
  }

  _getAspectStorageKey() {
    return `gallery-card-aspect:${JSON.stringify(this.config.entities)}`;
  }

  _readStoredMediaAspect() {
    try {
      const aspect = Number(localStorage.getItem(this._getAspectStorageKey()));

      return aspect >= 1 && aspect <= 2.4 ? aspect : undefined;
    } catch {
      return undefined;
    }
  }

  _startVideo(event) {
    // canplay fires again after every seek or rebuffer; only the first one after a selection may start playback.
    if (!this.autoPlayVideo) return;

    this.autoPlayVideo = false;
    if (this._isModalOpen) return;

    const playRequest = event.target.play();

    if (playRequest) playRequest.catch(() => {});
  }

  _videoMetadataLoaded(event) {
    const durationElement = event.target.closest("figure")?.querySelector(".duration");

    if (event.target.closest(".resource-viewer"))
      this._updateMediaAspect(event.target.videoWidth, event.target.videoHeight);

    if (Number.isFinite(event.target.duration) && durationElement) {
      durationElement.textContent = this._getFormattedVideoDuration(event.target.duration);
    }

    if (this.config.video_muted)
      event.target.muted = true;
  }

  _videoHasEnded() {
    if (!this.config.slideshow_video_end) return;

    this._selectResource(this.currentResourceIndex + 1, true);
    this._doSlideShow(true);
  }

  _popupCamera() {
    const event = new Event("hass-more-info", {
      bubbles: true,
      composed: true
    });

    event.detail = { entityId: this._currentResource()?.name };
    this.dispatchEvent(event);
  }

  // A modal <dialog> renders in the top layer, so it covers the whole dashboard even when an
  // ancestor (theme backdrop-filter, transforms, containment) would trap a position: fixed overlay.
  _openViewer() {
    const viewer = this.shadowRoot.querySelector("dialog.viewer");

    if (!viewer || viewer.open) return;

    this.shadowRoot.querySelector(".resource-viewer video")?.pause();
    this._resetZoom();
    this._isModalOpen = true;
    viewer.showModal();
    this.updateComplete.then(() => this._scrollStripItemIntoView(this.currentResourceIndex));
  }

  _closeViewer() {
    this._hideStripTooltip();
    const viewer = this.shadowRoot?.querySelector("dialog.viewer");

    if (viewer?.open) viewer.close();
    this._isModalOpen = false;
  }

  _handleModalClosed() {
    this._isModalOpen = false;
  }

  _handleStripPointerEnter(event, index) {
    if (event.pointerType === "mouse") this._showStripTooltip(event.currentTarget, index);
  }

  // Touch has no hover: a long press shows the tooltip instead.
  _handleStripPointerDown(event, index) {
    this._stripLongPressed = false;
    if (event.pointerType === "mouse") return;

    const target = event.currentTarget;

    clearTimeout(this._stripPressTimer);
    this._stripPressTimer = setTimeout(() => {
      this._stripLongPressed = true;
      this._showStripTooltip(target, index);
    }, 400);
  }

  _handleStripPointerUp(event) {
    clearTimeout(this._stripPressTimer);
    if (event.pointerType !== "mouse") this._hideStripTooltip();
  }

  _handleStripClick(index) {
    // A long press only peeks at the date; releasing it must not switch items.
    if (this._stripLongPressed) {
      this._stripLongPressed = false;
      return;
    }
    this._selectResource(index);
  }

  _showStripTooltip(item, index) {
    const tooltip = this.shadowRoot.querySelector(".strip-tooltip");
    const viewer = this.shadowRoot.querySelector("dialog.viewer");
    const text = this._getResourceTooltip(this.resources?.[index]);

    if (!tooltip || !viewer || !text) return;

    tooltip.textContent = text;
    tooltip.hidden = false;

    const itemRect = item.getBoundingClientRect();
    const viewerRect = viewer.getBoundingClientRect();
    const halfWidth = tooltip.offsetWidth / 2;
    const center = itemRect.left + itemRect.width / 2 - viewerRect.left;

    tooltip.style.left = `${Math.min(Math.max(center, halfWidth + 8), viewerRect.width - halfWidth - 8)}px`;
    tooltip.style.top = `${itemRect.top - viewerRect.top - 8}px`;
  }

  _hideStripTooltip() {
    clearTimeout(this._stripPressTimer);

    const tooltip = this.shadowRoot?.querySelector(".strip-tooltip");

    if (tooltip) tooltip.hidden = true;
  }

  _handleViewerStageClick(event) {
    // The click that follows a drag, swipe or double tap is part of that gesture, not a tap.
    if (Date.now() < this._suppressViewerClickUntil) return;
    // A tap on the empty area around the media closes the viewer.
    if (event.target === event.currentTarget || event.target.classList.contains("zoom-layer")) this._closeViewer();
  }

  _handleViewerPointerDown(event) {
    if ((event.pointerType === "mouse" && event.button !== 0) || event.target.closest("button, video")) return;

    this._viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Capture is only an optimization for drags that leave the stage.
    }
    event.currentTarget.classList.add("gesturing");

    if (this._viewerPointers.size === 1) {
      this._viewerGesture = { startX: event.clientX, startY: event.clientY, originX: this._zoom.x, originY: this._zoom.y, moved: false };
    } else if (this._viewerPointers.size === 2) {
      const [first, second] = [...this._viewerPointers.values()];

      this._viewerGesture = { pinch: true, startDistance: Math.hypot(first.x - second.x, first.y - second.y) || 1, startScale: this._zoom.scale, moved: true };
    }
  }

  _handleViewerPointerMove(event) {
    if (!this._viewerPointers.has(event.pointerId) || !this._viewerGesture) return;

    this._viewerPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const gesture = this._viewerGesture;

    if (gesture.pinch) {
      if (this._viewerPointers.size < 2) return;

      const [first, second] = [...this._viewerPointers.values()];
      const distance = Math.hypot(first.x - second.x, first.y - second.y);

      this._setZoom(gesture.startScale * distance / gesture.startDistance);
      return;
    }

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) gesture.moved = true;
    if (this._zoom.scale > 1) {
      this._zoom.x = gesture.originX + deltaX;
      this._zoom.y = gesture.originY + deltaY;
      this._applyZoom();
    }
  }

  _handleViewerPointerUp(event) {
    if (!this._viewerPointers.has(event.pointerId)) return;

    this._viewerPointers.delete(event.pointerId);
    const gesture = this._viewerGesture;

    if (this._viewerPointers.size > 0) {
      // One finger lifted after a pinch: continue as a pan from the remaining finger.
      const [remaining] = [...this._viewerPointers.values()];

      this._viewerGesture = { startX: remaining.x, startY: remaining.y, originX: this._zoom.x, originY: this._zoom.y, moved: true };
      return;
    }

    event.currentTarget.classList.remove("gesturing");
    this._viewerGesture = undefined;
    if (!gesture) return;

    if (gesture.moved) this._suppressViewerClickUntil = Date.now() + 400;
    if (gesture.pinch) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.moved) {
      // Double tap (or double click) toggles zoom around the tapped point.
      const now = Date.now();

      if (now - this._lastViewerTap < 300) {
        this._lastViewerTap = 0;
        this._suppressViewerClickUntil = Date.now() + 400;
        this._toggleZoomAt(event.clientX, event.clientY, event.currentTarget);
      } else {
        this._lastViewerTap = now;
      }
      return;
    }

    if (this._zoom.scale > 1) return;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY))
      this._selectResource(this.currentResourceIndex + (deltaX < 0 ? 1 : -1));
    else if (deltaY > 80 && deltaY > Math.abs(deltaX))
      this._closeViewer();
  }

  _handleViewerWheel(event) {
    if (!this._isImageResource(this._currentResource())) return;

    event.preventDefault();
    this._setZoom(this._zoom.scale * Math.exp(-event.deltaY * 0.0015));
  }

  _toggleZoomAt(clientX, clientY, stage) {
    if (!this._isImageResource(this._currentResource())) return;
    if (this._zoom.scale > 1) {
      this._resetZoom();
      return;
    }

    const rect = stage.getBoundingClientRect();
    const scale = 2.5;

    this._zoom = {
      scale,
      x: (rect.left + rect.width / 2 - clientX) * (scale - 1),
      y: (rect.top + rect.height / 2 - clientY) * (scale - 1)
    };
    this._applyZoom();
  }

  _setZoom(scale) {
    const nextScale = Math.min(Math.max(scale, 1), 5);

    if (!this._isImageResource(this._currentResource())) return;
    // Keep the visible point steady while scaling around the center.
    const ratio = nextScale / this._zoom.scale;

    this._zoom = { scale: nextScale, x: this._zoom.x * ratio, y: this._zoom.y * ratio };
    this._applyZoom();
  }

  _resetZoom() {
    this._zoom = { scale: 1, x: 0, y: 0 };
    this._applyZoom();
  }

  _applyZoom() {
    const layer = this.shadowRoot?.querySelector(".viewer .zoom-layer");

    if (!layer) return;

    // offsetWidth/Height are the untransformed size; the bounding rect would already include the scale.
    const maxX = (this._zoom.scale - 1) * layer.offsetWidth / 2;
    const maxY = (this._zoom.scale - 1) * layer.offsetHeight / 2;

    this._zoom.x = Math.min(Math.max(this._zoom.x, -maxX), maxX);
    this._zoom.y = Math.min(Math.max(this._zoom.y, -maxY), maxY);
    layer.style.transform = this._zoom.scale === 1 ? "" : `translate(${this._zoom.x}px, ${this._zoom.y}px) scale(${this._zoom.scale})`;
  }

  _reloadResources() {
    this._mediaResolveCache.clear();
    this._clearBrowseCache();
    this._previewErrorIndex = undefined;
    this._loadResources(this._hass);
  }

  _clearBrowseCache() {
    this._browseCacheGeneration++;
    this._mediaBrowseCache.clear();
    this._mediaBrowseInflight.clear();
  }

  _handlePreviewError() {
    const resource = this._currentResource();

    if (!resource) return;
    if (resource.mediaContentId && !resource.resolveRetried) {
      this._mediaResolveCache.delete(resource.mediaContentId);
      this._patchResource(resource, {
        pendingAuth: true,
        resolveError: false,
        resolveRetried: true
      });
      this._resolveResourceUrl(this._currentResource());
      return;
    }

    this._previewErrorIndex = this.currentResourceIndex;
  }

  _handleThumbnailError(resource) {
    // A thumbnail can outlive its signed URL; re-resolve once before showing the error tile.
    if (resource.mediaContentId && !resource.thumbnailRetried) {
      this._mediaResolveCache.delete(resource.mediaContentId);
      this._patchResource(resource, {
        pendingAuth: true,
        thumbnailRetried: true
      });
      // Resolve directly: the lazy-load queue may still hold this id until its whole batch finishes.
      this._resolveResourceUrl({ ...resource, pendingAuth: true });
      return;
    }

    this._patchResource(resource, { thumbnailError: true });
  }

  _handleResourceKeydown(event, index) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    this._selectResource(index);
  }

  _getFormattedVideoDuration(duration) {
    const totalSeconds = Math.floor(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");

    return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${seconds}` : `${minutes}:${seconds}`;
  }

  _keyNavigation(event) {
    const eventTarget = event.composedPath()[0];
    const isEditableTarget = eventTarget?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT", "VIDEO"].includes(eventTarget?.tagName);

    if (event.defaultPrevented || isEditableTarget || (!this.matches(":hover") && !this.shadowRoot.activeElement)) return;

    switch (event.code) {
      case "ArrowDown":
      case "ArrowRight": {
        event.preventDefault();
        this._selectResource(this.currentResourceIndex + 1);
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        event.preventDefault();
        this._selectResource(this.currentResourceIndex - 1);
        break;
      }
      default:
      // null
    }
  }

  _handleTouchStart(event) {
    this.xDown = event.touches[0].clientX;
    this.yDown = event.touches[0].clientY;
  }

  _handleTouchMove(event) {
    if (this.xDown === undefined || this.yDown === undefined) {
      return;
    }
    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;
    let gestureHandled = false;

    if (Math.abs(xDiff) >= 40 && Math.abs(xDiff) > Math.abs(yDiff)) {/* most significant */
      if (xDiff > 0) {
        /* left swipe */
        this._selectResource(this.currentResourceIndex + 1);
        event.preventDefault();
      } else {
        /* right swipe */
        this._selectResource(this.currentResourceIndex - 1);
        event.preventDefault();
      }
      gestureHandled = true;
    } else if (Math.abs(yDiff) >= 40) {
      gestureHandled = true;
    }

    if (gestureHandled) {
      this.xDown = undefined;
      this.yDown = undefined;
    }
  }

  _handleDateChange(event) {
    this._setDateFilter(event.target.value ? dayjs(event.target.value) : null);
  }

  _openDatePicker(event) {
    // Desktop browsers only open the calendar from the tiny icon; open it from anywhere on the chip.
    try {
      event.currentTarget.showPicker?.();
    } catch {
      // showPicker throws without user activation or in cross-origin frames; the native behavior remains.
    }
  }

  _setDateFilter(date) {
    this.selectedDate = date ? dayjs(date).startOf("day").toDate() : null;
    this._isDateFiltered = this.selectedDate !== null;
    this._loadResources(this._hass);
  }

  _convertOldFormat(format) {
    if (!format || typeof format !== "string") return format;
    return format
      .replace(/%YYY/g, "YYYY")
      .replace(/%Y/g, "YYYY")
      .replace(/%m/g, "MM")
      .replace(/%d/g, "DD")
      .replace(/%H/g, "HH")
      .replace(/%M/g, "mm")
      .replace(/%S/g, "ss");
  }

  async _loadResources(hass) {
    if (!hass || !this.config) return;

    if (this._isLoading) {
      this._pendingLoadRequested = true;
      return;
    }
    const loadToken = ++this._loadToken;

    this._isLoading = true;

    this.currentResourceIndex = undefined;
    this.resources = [];
    this.errors = [];
    this._previewErrorIndex = undefined;
    this._itemsToShow = this.config.items_per_page;
    this._cameraEntityIds = [];

    const filterForDate = (this.config.enable_date_search ?? false) && this._isDateFiltered;

    const configuredMaximumFiles = Number(this.config.maximum_files);
    const maximumFilesRaw = Number.isFinite(configuredMaximumFiles) && configuredMaximumFiles > 0 ? Math.floor(configuredMaximumFiles) : undefined;

    const maximumFilesPerEntity = this.config.maximum_files_per_entity ?? true;
    const maximumFilesTotal = maximumFilesPerEntity ? undefined : maximumFilesRaw;

    const cardFolderFormat = this._convertOldFormat(this.config.folder_format);
    const cardFileNameFormat = this._convertOldFormat(this.config.file_name_format);
    const cardFileNameDateBegins = this.config.file_name_date_begins;
    const cardCaptionFormat = this._convertOldFormat(this.config.caption_format);
    const parsedDateSort = this.config.parsed_date_sort ?? false;
    const reverseSort = this.config.reverse_sort ?? true;
    const randomSort = this.config.random_sort ?? false;
    const canPrelimitEachEntity = maximumFilesPerEntity || (!parsedDateSort && !randomSort);
    const maximumFiles = canPrelimitEachEntity ? maximumFilesRaw : undefined;

    const fetchAll = () => {
      const entityCommands = [];

      for (const entity of this.config.entities) {
        let entityId;
        let recursive = false;
        let includeVideo = true;
        let includeImages = true;
        let folderFormat = cardFolderFormat;
        let fileNameFormat = cardFileNameFormat;
        let fileNameDateBegins = cardFileNameDateBegins;
        let captionFormat = cardCaptionFormat;

        if (entity && typeof entity === "object") {
          entityId = entity.path;
          if (entity.recursive) recursive = entity.recursive;
          if (entity.include_video !== undefined) includeVideo = entity.include_video;
          if (entity.include_images !== undefined) includeImages = entity.include_images;
          if (entity.folder_format) folderFormat = this._convertOldFormat(entity.folder_format);
          if (entity.file_name_format) fileNameFormat = this._convertOldFormat(entity.file_name_format);
          if (entity.file_name_date_begins) fileNameDateBegins = entity.file_name_date_begins;
          if (entity.caption_format) captionFormat = this._convertOldFormat(entity.caption_format);
        } else {
          entityId = entity;
        }

        if (typeof entityId !== "string" || !entityId.trim()) {
          entityCommands.push(Promise.resolve({
            error: true,
            entity: String(entityId || "未配置来源"),
            message: "Invalid media source"
          }));
        } else if (entityId.substring(0, 15).toLowerCase() === "media-source://") {
          entityCommands.push(this._loadMediaResource(hass, entityId, maximumFiles, folderFormat, fileNameFormat, fileNameDateBegins, captionFormat, recursive, reverseSort, includeVideo, includeImages, filterForDate));
        } else {
          const entityState = hass.states[entityId];

          if (entityState === undefined) {
            entityCommands.push(Promise.resolve({
              error: true,
              entity: entityId,
              message: "Invalid Entity ID"
            }));
          } else {
            if (entityState.attributes.entity_picture !== undefined)
              entityCommands.push(this._loadCameraResource(entityId, entityState));

            if (entityState.attributes.fileList !== undefined)
              entityCommands.push(this._loadFilesResources(entityState.attributes.fileList, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort, filterForDate));

            if (entityState.attributes.file_list !== undefined)
              entityCommands.push(this._loadFilesResources(entityState.attributes.file_list, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort, filterForDate));
          }
        }
      }
      return entityCommands;
    };

    try {
      const resources = await Promise.all(fetchAll());
      let flatResources = resources.filter(result => !result.error).flat(Number.POSITIVE_INFINITY);

      if (filterForDate) flatResources = this._filterResourcesForSelectedDate(flatResources);

      if (parsedDateSort) {
        // Resources without a parseable date have date "" and sort as the oldest.
        const dateValue = resource => (resource.date ? resource.date.valueOf() : 0);
        const direction = reverseSort ? -1 : 1;

        flatResources.sort((x, y) => (dateValue(x) - dateValue(y)) * direction);
      }

      if (randomSort) {
        for (let index = flatResources.length - 1; index > 0; index--) {
          const r = Math.floor(Math.random() * (index + 1));

          if (index !== r) {
            [flatResources[index], flatResources[r]] = [flatResources[r], flatResources[index]];
          }
        }
      }

      if (maximumFilesTotal !== undefined && maximumFilesTotal < flatResources.length) {
        // Cameras are always kept, but they still take up slots of the total limit.
        let fileCount = flatResources.filter(resource => resource.isHass).length;

        flatResources = flatResources.filter(resource => resource.isHass || fileCount++ < maximumFilesTotal);
      }

      this.resources = flatResources;
      this._cameraEntityIds = flatResources.filter(resource => resource.isHass).map(resource => resource.name);
      this.currentResourceIndex = 0;
      this._resolveResourceUrl(this.resources[0]);
      this._addKeyNavigationListener();
      this.updateComplete.then(() => this._scrollThumbnailIntoView(0));

      const loadErrors = resources.filter(result => result.error).flat(Number.POSITIVE_INFINITY);

      this.errors = loadErrors.map(error => error.message + " " + error.entity);
      for (const error of loadErrors) {
        // system_log.write is admin-only; a rejection for other users must not surface as an unhandled error.
        Promise.resolve(hass.callService("system_log", "write", {
          message: "Gallery Card Error:  " + error.message + "   " + error.entity
        })).catch(() => {});
      }
    } catch (error) {
      if (loadToken === this._loadToken) {
        this.resources = [];
        this.currentResourceIndex = 0;
        this.errors = [error?.message || "Unknown gallery loading error"];
      }
      console.error("Gallery Card failed to load resources", error);
    } finally {
      if (loadToken === this._loadToken) {
        this._isLoading = false;
        if (this._pendingLoadRequested) {
          this._pendingLoadRequested = false;
          this._loadResources(this._hass);
        }
      }
    }
  }

  _addKeyNavigationListener() {
    if (this._hasKeyNavigationListener || !this.isConnected || (this.parentNode && this.parentNode.tagName && this.parentNode.tagName.toLowerCase() === "hui-card-preview")) {
      return;
    }

    document.addEventListener("keydown", this._keyNavigationHandler);
    this._hasKeyNavigationListener = true;
  }

  _removeKeyNavigationListener() {
    if (!this._hasKeyNavigationListener) return;

    document.removeEventListener("keydown", this._keyNavigationHandler);
    this._hasKeyNavigationListener = false;
  }

  async _loadMediaResource(hass, contentId, maximumFiles, folderFormat, fileNameFormat, fileNameDateBegins, captionFormat, recursive, reverseSort, includeVideo, includeImages, filterForDate) {
    let mediaPath = contentId;

    try {
      let values = [];
      const needsExactDateFilter = filterForDate && Boolean(fileNameFormat);
      const includeAdjacentDateFolders = needsExactDateFilter && this.config.date_search_adjacent_days > 0;
      const browseLimit = needsExactDateFilter ? undefined : maximumFiles;

      if (!filterForDate && folderFormat && reverseSort && maximumFiles !== undefined && !Number.isNaN(maximumFiles)) {  // Can do more targeted folder searching under these conditions
        let date = dayjs();
        let folderPrevious = "";
        const failedPaths = [];
        const basePath = contentId.replace(/\/+$/, "");
        let remainingSteps = 2 * 366;  // Never walk back more than a year of (half-day) folder candidates.

        while (values.length < maximumFiles && remainingSteps-- > 0) {
          const folder = date.format(folderFormat);

          mediaPath = basePath + "/" + folder;

          if (folder !== folderPrevious) {
            try {
              const folderValues = await this._loadMedia(this, hass, mediaPath, maximumFiles, false, reverseSort, includeVideo, includeImages, false, false);

              values.push(...folderValues);
            } catch (error) {
              if (error.code === 'browse_media_failed')
                failedPaths.push(mediaPath);
              else
                throw error;
            }
          }

          if (failedPaths.length > 2) {
            if (values.length === 0) {
              mediaPath = failedPaths.join(',');
              throw new Error('Failed to browse several folders and found no media files.  Verify your settings are correct.');
            }
            break;
          }

          folderPrevious = folder;
          date = date.subtract(12, 'hour');  // Allows for AM/PM folders
        }

        values.sort((a, b) => String(b.title || "").localeCompare(String(a.title || "")));
        if (values.length > maximumFiles) values.length = maximumFiles;
      } else
        values = await this._loadMedia(this, hass, mediaPath, browseLimit, recursive, reverseSort, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders);

      let resources = [];

      for (const mediaItem of values) {
        const resource = mediaItem.pending_authentication ?
          this._createPendingMediaResource(mediaItem, fileNameFormat, fileNameDateBegins, captionFormat) :
          this._createFileResource(mediaItem.authenticated_path, fileNameFormat, fileNameDateBegins, captionFormat);

        if (resource !== undefined) {
          resource.mediaContentId = mediaItem.media_content_id;
          resources.push(resource);
        }
      }

      if (needsExactDateFilter) resources = this._filterResourcesForSelectedDate(resources);
      if (maximumFiles !== undefined && maximumFiles < resources.length) resources.length = maximumFiles;

      return resources;
    } catch (error) {
      console.error("Gallery Card failed to load media source", error);
      return {
        error: true,
        entity: mediaPath,
        message: error.message
      };
    }
  }

  async _loadMedia(reference, hass, contentId, maximumFiles, recursive, reverseSort, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders) {
    const mediaItem = {
      media_class: "directory",
      media_content_id: contentId
    };

    if (contentId.substring(contentId.length - 1, contentId.length) !== "/" && contentId !== "media-source://media_source") {
      mediaItem.media_content_id += "/";
    }

    const hasFiniteLimit = Number.isFinite(maximumFiles) && maximumFiles > 0;
    const values = recursive && hasFiniteLimit ?
      await this._fetchMediaLimited(reference, hass, mediaItem, maximumFiles, reverseSort, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders) :
      await Promise.all(this._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders));
    const mediaItems = values
      .flat(Number.POSITIVE_INFINITY)
      .filter(function (item) { return item !== undefined; })
      .sort(
        function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        });

    if (reverseSort)
      mediaItems.reverse();

    if (maximumFiles !== undefined && !Number.isNaN(maximumFiles) && maximumFiles < mediaItems.length) {
      mediaItems.length = maximumFiles;
    }

    return mediaItems.map(item => ({
      ...item,
      pending_authentication: true
    }));
  }

  _fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders) {
    const commands = [];

    if (mediaItem.media_class === "directory") {
      if (mediaItem.children) {
        commands.push(
          ...mediaItem.children
            .filter(mediaItem => {
              return this._shouldIncludeMediaItem(reference, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders);
            })
            .map(mediaItem => {
              return Promise.all(reference._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders));
            }));
      }
      else {
        commands.push(
          reference._fetchMediaContents(hass, mediaItem.media_content_id)
            .then(mediaItem => {
              return Promise.all(reference._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders));
            })
        );
      }
    }

    if (mediaItem.media_class !== "directory") {
      commands.push(Promise.resolve(mediaItem));
    }

    return commands;
  }

  async _fetchMediaLimited(reference, hass, mediaItem, maximumFiles, reverseSort, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders) {
    const collectedItems = [];
    const sortDirection = reverseSort ? -1 : 1;

    const visit = async item => {
      if (collectedItems.length >= maximumFiles) return;

      if (item.media_class !== "directory") {
        collectedItems.push(item);
        return;
      }

      const directory = item.children ? item : await this._fetchMediaContents(hass, item.media_content_id);
      const children = [...(directory.children || [])]
        .filter(child => this._shouldIncludeMediaItem(reference, child, true, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders))
        .sort((a, b) => String(a.title || "").localeCompare(String(b.title || "")) * sortDirection);

      for (const child of children) {
        if (collectedItems.length >= maximumFiles) break;

        if (child.media_class === "directory")
          await visit(child);
        else
          collectedItems.push(child);
      }
    };

    await visit(mediaItem);
    return collectedItems;
  }

  _shouldIncludeMediaItem(reference, mediaItem, recursive, includeVideo, includeImages, filterForDate, includeAdjacentDateFolders) {
    if (!mediaItem || String(mediaItem.title || "").replace(/\/$/, "") === "@eaDir") return false;
    if (mediaItem.media_class === "video") return includeVideo;
    if (mediaItem.media_class === "image") return includeImages;
    if (!recursive || mediaItem.media_class !== "directory") return false;
    if (!filterForDate) return true;

    const folderFormat = reference.config.search_date_folder_format || "DD_MM_YYYY";
    const folderTitle = String(mediaItem.title || "").replace(/\/$/, "");
    const folderDate = dayjs(folderTitle, folderFormat, true);

    // Keep traversing source/category folders; only constrain folders that are actual dates.
    if (!folderDate.isValid() || folderDate.format(folderFormat) !== folderTitle) return true;

    const folderNames = reference._getDateSearchFolderNames(folderFormat, includeAdjacentDateFolders);

    return folderNames.has(folderTitle);
  }

  _fetchMediaContents(hass, contentId) {
    const cacheMs = this.config.browse_cache_seconds * 1000;
    const cached = this._mediaBrowseCache.get(contentId);

    if (cacheMs > 0 && cached?.expiresAt > Date.now()) {
      this._refreshCacheEntry(this._mediaBrowseCache, contentId, cached);
      return Promise.resolve(cached.value);
    }
    if (cached) this._mediaBrowseCache.delete(contentId);

    if (this._mediaBrowseInflight.has(contentId)) {
      return this._mediaBrowseInflight.get(contentId);
    }

    const cacheGeneration = this._browseCacheGeneration;
    const request = hass.callWS({
      type: "media_source/browse_media",
      media_content_id: contentId
    }).then(value => {
      if (cacheMs > 0 && cacheGeneration === this._browseCacheGeneration) {
        this._setLimitedCacheEntry(this._mediaBrowseCache, contentId, {
          value,
          expiresAt: Date.now() + cacheMs
        }, 100);
      }
      return value;
    }).finally(() => {
      if (this._mediaBrowseInflight.get(contentId) === request) {
        this._mediaBrowseInflight.delete(contentId);
      }
    });

    this._mediaBrowseInflight.set(contentId, request);
    return request;
  }

  _fetchMediaItem(hass, mediaItemPath) {
    return hass.callWS({
      type: "media_source/resolve_media",
      media_content_id: mediaItemPath,
      expires: (60 * 60 * 3)  // 3 hours
    });
  }

  _fetchMediaItemWithCache(hass, mediaItemPath) {
    const cached = this._mediaResolveCache.get(mediaItemPath);

    if (cached && cached.expiresAt > Date.now()) {
      this._refreshCacheEntry(this._mediaResolveCache, mediaItemPath, cached);
      return Promise.resolve({ url: cached.url });
    }
    if (cached) this._mediaResolveCache.delete(mediaItemPath);

    if (this._mediaResolveInflight.has(mediaItemPath)) {
      return this._mediaResolveInflight.get(mediaItemPath);
    }

    const request = this._fetchMediaItem(hass, mediaItemPath).then(auth => {
      this._setLimitedCacheEntry(this._mediaResolveCache, mediaItemPath, {
        url: auth.url,
        expiresAt: Date.now() + this._mediaResolveCacheMs
      }, this.config.media_cache_size);
      return auth;
    }).finally(() => {
      this._mediaResolveInflight.delete(mediaItemPath);
    });

    this._mediaResolveInflight.set(mediaItemPath, request);
    return request;
  }

  _refreshCacheEntry(cache, key, value) {
    cache.delete(key);
    cache.set(key, value);
  }

  _setLimitedCacheEntry(cache, key, value, maximumSize) {
    this._refreshCacheEntry(cache, key, value);

    while (cache.size > maximumSize) {
      const oldestKey = cache.keys().next().value;

      cache.delete(oldestKey);
    }
  }

  _loadCameraResource(entityId, camera) {
    const resource = {
      url: camera.attributes.entity_picture,
      name: entityId,
      extension: "jpg",
      caption: camera.attributes.friendly_name ?? entityId,
      isHass: true
    };

    return Promise.resolve(resource);
  }

  _loadFilesResources(files, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort, filterForDate) {
    let resources = [];

    if (Array.isArray(files)) {
      files = [...files].filter(file => typeof file === "string" && !file.includes("@eaDir"));

      if (reverseSort)
        files.reverse();

      if (!filterForDate && maximumFiles !== undefined && !Number.isNaN(maximumFiles) && maximumFiles < files.length) {
        files.length = maximumFiles;
      }

      for (const file of files) {
        const filePath = file;
        let fileUrl;

        if (filePath.startsWith("/local/") || filePath.startsWith("http://") || filePath.startsWith("https://")) {
          fileUrl = filePath;
        } else if (filePath.includes("/config/www/")) {
          fileUrl = filePath.replace("/config/www/", "/local/");
        } else if (filePath.includes("/www/")) {
          fileUrl = "/local/" + filePath.slice(filePath.indexOf("/www/") + 5);
        } else if (!filePath.startsWith("/")) {
          fileUrl = "/local/" + filePath;
        } else {
          continue;
        }

        const resource = this._createFileResource(fileUrl, fileNameFormat, fileNameDateBegins, captionFormat);

        if (resource !== undefined) {
          resources.push(resource);
        }
      }

      if (filterForDate && fileNameFormat) resources = this._filterResourcesForSelectedDate(resources);
      if (maximumFiles !== undefined && maximumFiles < resources.length) resources.length = maximumFiles;
    }

    return Promise.resolve(resources);
  }

  _createFileResource(fileRawUrl, fileNameFormat, fileNameDateBegins, captionFormat) {
    if (!fileRawUrl) return undefined;
    let resource;

    const fileUrl = fileRawUrl.split("?")[0];
    const arfilePath = fileUrl.split("/");
    let fileName = arfilePath.at(-1);
    let date = "";
    let fileCaption = "";

    if (fileName !== '@eaDir') {
      const extensionIndex = fileName.lastIndexOf(".");
      const extension = extensionIndex > 0 ? fileName.slice(extensionIndex + 1).toLowerCase() : "";

      if (extensionIndex > 0) fileName = fileName.slice(0, extensionIndex);
      try {
        fileName = decodeURIComponent(fileName);
      } catch {
        // Keep malformed percent-encoded filenames readable instead of dropping the resource.
      }

      if (captionFormat !== " ")
        fileCaption = fileName;

      let fileDatePart = fileName;

      if (fileNameDateBegins && !Number.isNaN(Number.parseInt(fileNameDateBegins)))
        fileDatePart = fileDatePart.slice(Math.max(0, Number.parseInt(fileNameDateBegins) - 1));
      if (fileNameFormat) {
        const parsedDate = dayjs(fileDatePart, fileNameFormat);

        // An unparseable name keeps its filename caption instead of showing "Invalid Date".
        if (parsedDate.isValid()) date = parsedDate;
      }

      if (date && captionFormat) {
        if (captionFormat.toUpperCase().trim() === 'AGO')
          fileCaption = date.fromNow();
        else {
          fileCaption = date.format(captionFormat);
          fileCaption = fileCaption.replaceAll(/ago/gi, date.fromNow());
        }
      }

      resource = {
        url: fileRawUrl,
        base_url: fileUrl,
        name: fileName,
        extension,
        caption: fileCaption,
        index: -1,
        date,
        dateFilterable: Boolean(fileNameFormat)
      };
    }

    return resource;
  }

  _createPendingMediaResource(mediaItem, fileNameFormat, fileNameDateBegins, captionFormat) {
    const resource = this._createFileResource(mediaItem.title || mediaItem.media_content_id, fileNameFormat, fileNameDateBegins, captionFormat);

    if (!resource) return undefined;

    // Titles from some media sources carry no extension, so trust the browse metadata for the media type.
    const contentType = String(mediaItem.media_content_type || "");
    const mediaType = ["image", "video"].includes(mediaItem.media_class) ?
      mediaItem.media_class :
      contentType.startsWith("image/") ? "image" : contentType.startsWith("video/") ? "video" : undefined;

    return {
      ...resource,
      url: "",
      mediaContentId: mediaItem.media_content_id,
      mediaType,
      pendingAuth: true
    };
  }

  async _resolvePendingResourceBatch(resources, hass, loadToken) {
    const concurrency = this.config.resolve_concurrency;
    const pendingResources = resources.filter(resource => {
      if (this._queuedResolveIds.get(resource.mediaContentId) === loadToken) return false;

      this._queuedResolveIds.set(resource.mediaContentId, loadToken);
      return true;
    });

    try {
      for (let index = 0; index < pendingResources.length; index += concurrency) {
        if (loadToken !== this._loadToken) return;

        const batch = pendingResources.slice(index, index + concurrency);
        const results = await Promise.all(batch.map(async resource => {
          try {
            const auth = await this._fetchMediaItemWithCache(hass, resource.mediaContentId);

            return {
              mediaContentId: resource.mediaContentId,
              url: auth.url
            };
          } catch (error) {
            console.error("Gallery Card failed to resolve media URL", error);
            return {
              mediaContentId: resource.mediaContentId,
              error: true
            };
          }
        }));

        this._applyResourceResolutionResults(results, loadToken);
      }
    } finally {
      for (const resource of pendingResources) {
        if (this._queuedResolveIds.get(resource.mediaContentId) === loadToken) {
          this._queuedResolveIds.delete(resource.mediaContentId);
        }
      }
    }
  }

  _resolveResourceUrl(resource, hass = this._hass, loadToken = this._loadToken) {
    if (!resource || !resource.pendingAuth || !resource.mediaContentId) return Promise.resolve();

    return this._fetchMediaItemWithCache(hass, resource.mediaContentId).then(auth => {
      const resolvedItem = {
        mediaContentId: resource.mediaContentId,
        url: auth.url
      };

      this._applyResourceResolutionResults([resolvedItem], loadToken);

      return resolvedItem;
    }).catch(error => {
      this._applyResourceResolutionResults([{
        mediaContentId: resource.mediaContentId,
        error: true
      }], loadToken);
      console.error("Gallery Card failed to resolve media URL", error);
      return undefined;
    });
  }

  _applyResourceResolutionResults(results, loadToken) {
    if (loadToken !== this._loadToken || results.length === 0) return;

    const resultsById = new Map(results.map(item => [item.mediaContentId, item]));

    this.resources = (this.resources || []).map(item => {
      const result = resultsById.get(item.mediaContentId);

      if (!result) return item;
      if (result.error) {
        return {
          ...item,
          pendingAuth: false,
          resolveError: true
        };
      }

      return {
        ...item,
        url: result.url,
        pendingAuth: false,
        resolveError: false,
        thumbnailError: false
      };
    });
  }

  _getDateSearchFolderNames(folderFormat, includeAdjacentDateFolders) {
    const adjacentDays = includeAdjacentDateFolders ? this.config.date_search_adjacent_days : 0;
    const selectedDate = dayjs(this.selectedDate);
    const folderNames = new Set();

    for (let offset = -adjacentDays; offset <= adjacentDays; offset++) {
      folderNames.add(selectedDate.add(offset, "day").format(folderFormat));
    }

    return folderNames;
  }

  _filterResourcesForSelectedDate(resources) {
    const selectedDate = dayjs(this.selectedDate).format("YYYY-MM-DD");

    return resources.filter(resource => {
      if (!resource.dateFilterable) return true;
      if (!resource.date || !dayjs(resource.date).isValid()) return false;
      return dayjs(resource.date).format("YYYY-MM-DD") === selectedDate;
    });
  }

  _formatDateForInput(date) {
    if (!date) return "";
    return dayjs(date).format("YYYY-MM-DD");
  }




  static get styles() {
    return css`
      :host {
        --gallery-accent: var(--primary-color, #03a9f4);
        --gallery-accent-rgb: var(--rgb-primary-color, 3, 169, 244);
        --gallery-text: var(--primary-text-color, #212121);
        --gallery-text-secondary: var(--secondary-text-color, #727272);
        --gallery-surface: var(--card-background-color, #fff);
        --gallery-divider: var(--divider-color, rgba(0, 0, 0, 0.12));
        --gallery-placeholder: rgba(127, 127, 127, 0.14);
        --gallery-stage-bg: #0e0e0e;
        display: block;
        container: gallery-card / inline-size;
      }

      /* Card shell. Page mode (default) fills the viewport below the dashboard header and scrolls the
         timeline internally; .height-auto sizes to content for use as a regular card. */
      ha-card {
        height: var(--gallery-card-height, calc(100dvh - var(--header-height, 56px)));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: var(--gallery-text);
        background: var(--gallery-surface);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--gallery-divider));
        box-sizing: border-box;
      }
      ha-card.height-auto {
        height: auto;
      }
      button {
        font: inherit;
      }
      ha-icon {
        --mdc-icon-size: 22px;
      }

      /* Stage: preview plus info bar */
      .stage {
        position: relative;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        background: var(--gallery-stage-bg);
      }
      .resource-viewer {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      hui-image {
        display: block;
        width: 100%;
        height: 100%;
      }
      .preview-image {
        cursor: zoom-in;
        animation: gallery-fade-in 0.25s ease;
      }
      .resource-viewer hui-image {
        cursor: pointer;
      }
      .loading-state,
      .empty-state {
        width: 100%;
        height: 100%;
        min-height: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px;
        color: rgba(255, 255, 255, 0.82);
        text-align: center;
        box-sizing: border-box;
      }
      .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-top-color: var(--gallery-accent);
        border-radius: 50%;
        animation: gallery-spin 0.8s linear infinite;
      }
      .loading-label,
      .empty-label {
        font-size: 14px;
      }
      .empty-state ha-icon {
        --mdc-icon-size: 40px;
        opacity: 0.7;
      }
      .error-state ha-icon {
        color: var(--error-color, #db4437);
      }
      .empty-action {
        padding: 6px 16px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 999px;
        background: transparent;
        color: #fff;
        cursor: pointer;
      }
      .empty-action:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .viewer-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        pointer-events: none;
      }
      .nav-icon-btn {
        pointer-events: auto;
        width: 44px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease, background 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .nav-icon-btn ha-icon {
        --mdc-icon-size: 28px;
      }
      .resource-viewer:hover .nav-icon-btn,
      .viewer-stage:hover .nav-icon-btn,
      .nav-icon-btn:focus-visible {
        opacity: 1;
      }
      .nav-icon-btn:hover {
        background: rgba(0, 0, 0, 0.7);
      }

      /* Info bar: heads the timeline column (or sits under the preview), never on top of the picture,
         since camera recordings often burn their timestamp into the top of the frame. */
      .info-bar {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2px 12px;
        padding: 8px 6px 8px 14px;
        color: var(--gallery-text);
        background: var(--gallery-surface);
        border-bottom: 1px solid var(--gallery-divider);
      }
      .stage .info-bar {
        border-top: 1px solid var(--gallery-divider);
        border-bottom: 0;
      }
      .info-text {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 10px;
        white-space: nowrap;
        overflow: hidden;
      }
      .info-title {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 16px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-caption {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 15px;
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-title + .info-caption {
        font-size: 14px;
        color: var(--gallery-text-secondary);
      }
      .info-relative {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 13px;
        color: var(--gallery-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-actions {
        flex: none;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .info-counter {
        margin-right: 6px;
        font-size: 13px;
        font-variant-numeric: tabular-nums;
        color: var(--gallery-text-secondary);
      }
      .viewer .info-relative,
      .viewer .info-counter {
        color: rgba(255, 255, 255, 0.7);
      }
      .icon-button ha-icon {
        --mdc-icon-size: 24px;
      }
      .spinning {
        animation: gallery-spin 0.9s linear infinite;
      }
      .icon-button {
        width: 40px;
        height: 40px;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
      }
      .icon-button:hover:not(:disabled) {
        background: rgba(127, 127, 127, 0.22);
      }
      .icon-button[aria-pressed="true"] {
        color: var(--gallery-accent);
      }
      .icon-button:disabled {
        cursor: default;
        opacity: 0.4;
      }
      .icon-button:focus-visible,
      .chip:focus-visible,
      .load-more:focus-visible,
      .empty-action:focus-visible,
      .strip-item:focus-visible {
        outline: 2px solid var(--gallery-accent);
        outline-offset: 2px;
      }

      /* Timeline */
      .timeline {
        container: gallery-menu / inline-size;
        flex: none;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        background: var(--gallery-surface);
      }
      .date-chips {
        flex: none;
        display: flex;
        gap: 6px;
        padding: 12px;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid var(--gallery-divider);
      }
      .date-chips::-webkit-scrollbar {
        display: none;
      }
      .chip {
        position: relative;
        flex: none;
        height: 32px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0 12px;
        border: 1px solid var(--gallery-divider);
        border-radius: 16px;
        background: transparent;
        color: var(--gallery-text);
        font-size: 13px;
        white-space: nowrap;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .chip:hover {
        background: var(--gallery-placeholder);
      }
      .chip.active {
        border-color: transparent;
        background: rgba(var(--gallery-accent-rgb), 0.16);
        color: var(--gallery-accent);
        font-weight: 500;
      }
      .chip-date ha-icon {
        --mdc-icon-size: 16px;
      }
      .chip-date:focus-within {
        outline: 2px solid var(--gallery-accent);
        outline-offset: 2px;
      }
      .date-picker {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        opacity: 0;
        cursor: pointer;
      }
      .error-list {
        flex: none;
        max-height: 112px;
        padding: 8px 12px;
        overflow-y: auto;
        border-bottom: 1px solid var(--gallery-divider);
      }
      .resource-menu {
        flex: 1 1 auto;
        min-height: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-auto-rows: max-content;
        align-content: start;
        gap: 12px 10px;
        padding: 12px 12px 16px;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: rgba(127, 127, 127, 0.4) transparent;
      }
      /* Grouped lists start with a sticky day header, which must stick flush under the chips. */
      .resource-menu.grouped {
        padding-top: 0;
      }
      @container gallery-menu (min-width: 480px) {
        .resource-menu {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      @container gallery-menu (min-width: 680px) {
        .resource-menu {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }
      @container gallery-menu (min-width: 900px) {
        .resource-menu {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
      }
      .day-header {
        grid-column: 1 / -1;
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin: 0 -12px;
        padding: 12px 12px 4px;
        background: var(--gallery-surface);
        font-size: 14px;
        font-weight: 600;
      }
      .day-date::before {
        content: " · ";
      }
      .day-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--gallery-text-secondary);
        font-variant-numeric: tabular-nums;
      }
      .thumb {
        margin: 0;
        min-width: 0;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
      }
      .thumb-media {
        position: relative;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        overflow: hidden;
        border-radius: 8px;
        background: var(--gallery-placeholder);
        transition: box-shadow 0.15s ease;
      }
      .thumb-media img,
      .thumb-media video {
        object-fit: cover;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      .thumb-media .lzy_img:not([src]),
      .thumb-media .lzy_video:not([src]) {
        opacity: 0;
      }
      @media (hover: hover) {
        .thumb:hover .thumb-media img,
        .thumb:hover .thumb-media video {
          transform: scale(1.05);
        }
      }
      .thumb.selected .thumb-media {
        box-shadow: 0 0 0 2px var(--gallery-surface), 0 0 0 4px var(--gallery-accent);
      }
      .thumb:focus-visible .thumb-media {
        box-shadow: 0 0 0 2px var(--gallery-surface), 0 0 0 4px var(--gallery-accent);
      }
      .thumb figcaption {
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.3;
        color: var(--gallery-text-secondary);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .thumb.selected figcaption {
        color: var(--gallery-accent);
        font-weight: 600;
      }
      .video-badge {
        position: absolute;
        right: 6px;
        bottom: 6px;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 1px 6px 1px 3px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 11px;
        line-height: 18px;
        font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      .video-badge ha-icon {
        --mdc-icon-size: 14px;
      }
      .new-dot {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gallery-accent);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
      }
      .thumbnail-loading,
      .thumbnail-error,
      .video-placeholder,
      .skeleton-media {
        width: 100%;
        height: 100%;
      }
      .thumbnail-error,
      .video-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        color: var(--gallery-text-secondary);
        font-size: 12px;
      }
      .skeleton-media {
        background: linear-gradient(90deg, var(--gallery-placeholder) 0%, rgba(127, 127, 127, 0.26) 45%, var(--gallery-placeholder) 90%);
        background-size: 220% 100%;
        animation: gallery-shimmer 1.2s ease-in-out infinite;
      }
      .resource-skeleton {
        pointer-events: none;
      }
      .skeleton-caption {
        width: 40%;
        height: 10px;
        margin-top: 8px;
        border-radius: 5px;
        background: var(--gallery-placeholder);
      }
      .menu-empty {
        grid-column: 1 / -1;
        padding: 32px 8px;
        color: var(--gallery-text-secondary);
        text-align: center;
        font-size: 14px;
      }
      .load-more {
        grid-column: 1 / -1;
        padding: 10px;
        border: 0;
        border-radius: 8px;
        background: var(--gallery-placeholder);
        color: var(--gallery-text-secondary);
        font-size: 13px;
        cursor: pointer;
      }
      .load-more:hover {
        color: var(--gallery-accent);
      }

      /* Wide layouts */
      .menu-responsive,
      .menu-right {
        flex-direction: row;
      }
      .menu-left {
        flex-direction: row-reverse;
      }
      .menu-top {
        flex-direction: column-reverse;
      }
      /* Side timeline: the preview takes the width its media needs at full height, and the timeline
         gets the rest (at least --gallery-card-sidebar-width), so the picture is never shrunk to make
         room for thumbnails while space is left over. */
      .menu-responsive .stage,
      .menu-right .stage,
      .menu-left .stage {
        flex: 0 1 auto;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
      }
      .menu-responsive .timeline,
      .menu-right .timeline,
      .menu-left .timeline {
        flex: 1 0 var(--gallery-card-sidebar-width, 280px);
        min-width: var(--gallery-card-sidebar-width, 280px);
      }
      .menu-responsive .info-text,
      .menu-right .info-text,
      .menu-left .info-text {
        flex-basis: 100%;
      }
      .menu-responsive .info-actions,
      .menu-right .info-actions,
      .menu-left .info-actions {
        flex: 1 1 100%;
        margin-left: -8px;
      }
      .menu-responsive .info-counter,
      .menu-right .info-counter,
      .menu-left .info-counter {
        order: 1;
        margin-left: auto;
      }
      .menu-responsive .timeline,
      .menu-right .timeline {
        border-left: 1px solid var(--gallery-divider);
      }
      .menu-left .timeline {
        border-right: 1px solid var(--gallery-divider);
      }
      .menu-hidden .timeline {
        display: none;
      }
      /* Filmstrip layouts (top/bottom): info bar and date chips share one row above the strip. */
      .menu-top .timeline,
      .menu-bottom .timeline {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .menu-top .timeline > :not(.info-bar):not(.date-chips),
      .menu-bottom .timeline > :not(.info-bar):not(.date-chips) {
        grid-column: 1 / -1;
      }
      .menu-top .resource-menu,
      .menu-bottom .resource-menu {
        flex: none;
        display: flex;
        gap: 10px;
        padding: 12px;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-top .thumb,
      .menu-bottom .thumb {
        flex: 0 0 var(--gallery-card-strip-item-width, 150px);
        margin-top: 0;
      }
      .menu-top .day-header,
      .menu-bottom .day-header {
        flex: none;
        position: sticky;
        top: auto;
        left: -12px;
        margin: 0;
        padding: 0 10px;
        align-self: stretch;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        /* Opaque: the tab stays pinned while thumbnails scroll underneath it. */
        background: linear-gradient(var(--gallery-placeholder), var(--gallery-placeholder)), var(--gallery-surface);
        box-shadow: 6px 0 8px -6px rgba(0, 0, 0, 0.3);
      }
      .menu-top .day-label,
      .menu-bottom .day-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        white-space: nowrap;
      }
      .menu-top .day-date,
      .menu-bottom .day-date {
        font-size: 11px;
        font-weight: 400;
        color: var(--gallery-text-secondary);
      }
      .menu-top .day-date::before,
      .menu-bottom .day-date::before {
        content: none;
      }
      .menu-top .day-count,
      .menu-bottom .day-count {
        display: none;
      }
      .menu-top .load-more,
      .menu-bottom .load-more {
        flex: none;
        padding: 0 16px;
        white-space: nowrap;
      }
      .menu-top .timeline,
      .menu-bottom .timeline {
        border-top: 1px solid var(--gallery-divider);
      }

      /* Card mode on wide layouts: the preview sets the height and the timeline matches it. */
      ha-card.height-auto .stage {
        flex: 1 1 auto;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        max-height: 80vh;
      }
      ha-card.height-auto.menu-responsive .timeline,
      ha-card.height-auto.menu-right .timeline,
      ha-card.height-auto.menu-left .timeline {
        flex: 0 0 var(--gallery-card-sidebar-width, 280px);
        contain: size;
      }

      /* Narrow cards (phones): preview on top, info bar under it, scrolling timeline below.
         ha-card[class] outranks the per-layout rules above without !important. */
      @container gallery-card (max-width: 599px) {
        ha-card[class] {
          flex-direction: column;
        }
        ha-card[class] .stage {
          flex: none;
          aspect-ratio: auto;
          max-height: none;
        }
        ha-card[class] .resource-viewer {
          flex: none;
          aspect-ratio: var(--gallery-media-aspect, 16 / 9);
          max-height: 50dvh;
        }
        /* One row on phones: the text gives way (ellipsis) instead of pushing the buttons to a second row. */
        ha-card[class] .info-text {
          flex: 1 1 0;
        }
        ha-card[class] .info-bar {
          flex-wrap: nowrap;
          gap: 8px;
          padding: 4px 4px 4px 14px;
        }
        ha-card[class] .icon-button {
          width: 36px;
          height: 36px;
        }
        ha-card[class] .info-actions {
          flex: none;
          margin-left: 0;
        }
        /* The highlighted thumbnail already shows the position; the capture time must never be cut. */
        ha-card[class] .info-counter {
          display: none;
        }
        ha-card[class] .info-caption {
          flex: none;
          font-size: 15px;
          color: var(--gallery-text);
        }
        ha-card[class] .timeline {
          display: flex;
          flex: 1 1 auto;
          width: 100%;
          min-width: 0;
          contain: none;
          border: 0;
        }
        ha-card[class] .resource-menu {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px 6px;
          padding: 10px 10px 16px;
          overflow-x: hidden;
          overflow-y: auto;
        }
        ha-card[class] .resource-menu.grouped {
          padding-top: 0;
        }
        ha-card[class] .thumb {
          flex: initial;
        }
        ha-card[class] .thumb-media {
          border-radius: 6px;
        }
        ha-card[class] .day-header {
          position: sticky;
          top: 0;
          left: auto;
          align-self: auto;
          margin: 0 -10px;
          padding: 12px 10px 4px;
          justify-content: space-between;
          align-items: baseline;
          border-radius: 0;
          background: var(--gallery-surface);
        }
        ha-card[class] .day-label {
          display: inline;
        }
        ha-card[class] .day-date {
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
        }
        ha-card[class] .day-date::before {
          content: " · ";
        }
        ha-card[class] .day-count {
          display: inline;
        }
        ha-card[class] .load-more {
          padding: 10px;
        }
        /* On phones the current item's time matters more than the page title. */
        .info-text.has-caption .info-title {
          display: none;
        }
        .nav-icon-btn {
          opacity: 0.85;
          width: 36px;
          height: 36px;
        }
        .date-chips {
          padding: 10px;
        }
        ha-card.height-auto .timeline {
          flex: none;
        }
        ha-card.menu-hidden[class]:not(.height-auto) .stage,
        ha-card.menu-hidden[class]:not(.height-auto) .resource-viewer {
          flex: 1 1 auto;
          max-height: none;
          aspect-ratio: auto;
        }
        ha-card.height-auto .resource-menu {
          overflow: visible;
        }
      }
      @container gallery-card (max-width: 320px) {
        ha-card[class] .resource-menu {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (hover: none) {
        /* Touch screens have no hover to reveal the arrows. */
        .resource-viewer .nav-icon-btn {
          opacity: 0.85;
        }
      }

      /* Full-screen viewer */
      .viewer {
        inset: 0;
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        overscroll-behavior: contain;
        background: #000;
        color: #fff;
      }
      .viewer[open] {
        display: flex;
        flex-direction: column;
        animation: gallery-fade-in 0.2s ease;
      }
      .viewer::backdrop {
        background: #000;
      }
      .viewer-top {
        flex: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: max(6px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) 6px max(8px, env(safe-area-inset-left));
      }
      .viewer-title {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 10px;
        white-space: nowrap;
        overflow: hidden;
      }
      .viewer-stage {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
        touch-action: none;
        user-select: none;
      }
      .zoom-layer {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center;
        transition: transform 0.2s ease;
      }
      .gesturing .zoom-layer {
        transition: none;
      }
      .viewer-media {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        animation: gallery-zoom-in 0.25s ease;
      }
      hui-image.viewer-media {
        width: 100%;
        height: 100%;
      }
      .viewer-strip {
        flex: none;
        display: flex;
        gap: 6px;
        justify-content: safe center;
        padding: 10px max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
        overflow-x: auto;
        scrollbar-width: none;
      }
      .viewer-strip::-webkit-scrollbar {
        display: none;
      }
      .strip-item {
        position: relative;
        flex: none;
        height: 44px;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        padding: 0;
        border: 0;
        border-radius: 6px;
        overflow: hidden;
        background: #222;
        opacity: 0.45;
        cursor: pointer;
        transition: opacity 0.15s ease, transform 0.15s ease;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
      }
      /* Drawn above the media: an inset shadow on the button would be hidden under the image. */
      .strip-item::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid transparent;
        border-radius: inherit;
        pointer-events: none;
      }
      .strip-item:hover {
        opacity: 0.8;
      }
      .strip-item.selected {
        opacity: 1;
        transform: scale(1.08);
      }
      .strip-item.selected::after {
        border-color: #fff;
      }
      .strip-day {
        flex: none;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 44px;
        padding: 0 2px 0 8px;
        border-left: 1px solid rgba(255, 255, 255, 0.28);
        color: rgba(255, 255, 255, 0.85);
        font-size: 11px;
        line-height: 1.35;
        white-space: nowrap;
      }
      .strip-day:first-child {
        padding-left: 0;
        border-left: 0;
      }
      .strip-day-date {
        color: rgba(255, 255, 255, 0.55);
        font-variant-numeric: tabular-nums;
      }
      .strip-tooltip {
        position: absolute;
        z-index: 3;
        transform: translate(-50%, -100%);
        padding: 4px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.92);
        color: #111;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        pointer-events: none;
      }
      .strip-tooltip[hidden] {
        display: none;
      }
      .strip-item img,
      .strip-item video {
        object-fit: cover;
      }
      .strip-item .thumbnail-error,
      .strip-item .video-placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0;
      }
      @media (hover: none) {
        .viewer .viewer-nav {
          display: none;
        }
      }

      @keyframes gallery-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes gallery-zoom-in {
        from { transform: scale(0.96); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes gallery-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes gallery-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          scroll-behavior: auto !important;
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
  }
}

// Guard against the resource being loaded twice (e.g. listed under two URLs), which would otherwise throw.
if (!customElements.get("gallery-card")) {
  customElements.define("gallery-card", GalleryCard);

  console.groupCollapsed(`%cGALLERY-CARD ${GalleryCardVersion} IS INSTALLED`, "color: green; font-weight: bold");
  console.log("Readme:", "https://github.com/fange173/gallery-card-2026");
  console.groupEnd();

  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "gallery-card",
    name: "Gallery Card 2026",
    preview: false, // Optional - defaults to false
    description: "Gallery Card 2026 displays images and videos from media sources, file-list sensors, and camera entities.", // Optional
    documentationURL: "https://github.com/fange173/gallery-card-2026"
  });
}
