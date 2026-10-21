import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const GalleryCardVersion = "2026.0.1";
const ValidMenuAlignments = new Set(["responsive", "right", "left", "bottom", "top", "hidden"]);

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
  }

  render() {
    if (!this.config) return html``;

    const menuAlignment = (this.config.menu_alignment || "responsive").toLowerCase();
    const resources = this.resources || [];
    const hasResources = resources.length > 0;
    const hasErrors = this.errors.length > 0;
    const showToolbar = Boolean(this.config.title || this.config.enable_date_search || this.config.show_reload);
    const currentResource = hasResources ? this._currentResource() : undefined;
    const previewHasError = currentResource && (currentResource.resolveError || this._previewErrorIndex === this.currentResourceIndex);
    const errorHint = this.config.show_reload ? "媒体加载失败，请点击刷新后重试" : "媒体加载失败，请检查媒体来源";
    const emptyHint = hasErrors ? errorHint : this._isDateFiltered ? "所选日期没有图片或视频" : "没有可显示的图片或视频";
    const hasDateSearch = Boolean(this.config.enable_date_search);
    const toolbarClasses = hasDateSearch ? "card-header-actions has-date" : "card-header-actions";

    return html`
      <ha-card class="menu-${menuAlignment}">
        <div class="resource-viewer" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
          <figure>
            ${this._isLoading ?
        this._renderLoadingState("正在加载媒体...") :
        !hasResources ?
          this._renderEmptyState(emptyHint) :
        previewHasError ?
          this._renderErrorState(errorHint) :
        currentResource.pendingAuth ?
          this._renderLoadingState("正在加载预览...") :
        currentResource.isHass ?
        html`
                  <hui-image @click="${event => this._popupCamera(event)}"
                                      .hass=${this._hass}
                                      .cameraImage=${currentResource.name}
                                      .cameraView=${"live"}
                                      .fitMode=${"contain"}
                                    ></hui-image>
                ` :
        this._isImageResource(currentResource) ?
          html`<img class="preview-image" @click="${() => this._popupImage()}" @error="${() => this._handlePreviewError()}" src="${currentResource.url}" alt="${currentResource.caption || currentResource.name}"/>` :
          html`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay && !this._isModalOpen} .muted=${Boolean(this.config.video_muted)} src="${currentResource.url}#t=0.1" @error="${() => this._handlePreviewError()}" @loadedmetadata="${event => this._videoMetadataLoaded(event)}" @canplay="${event => this._startVideo(event)}"
                            @ended="${() => this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`
          }
          </figure>
          ${!this._isLoading && resources.length > 1 ? html`<div class="viewer-nav">
            <button type="button" class="nav-icon-btn nav-left" @click="${() => this._selectResource(this.currentResourceIndex - 1)}" aria-label="上一个" title="上一个">
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button type="button" class="nav-icon-btn nav-right" @click="${() => this._selectResource(this.currentResourceIndex + 1)}" aria-label="下一个" title="下一个">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
          <div class="viewer-counter" aria-hidden="true">${this.currentResourceIndex + 1} / ${resources.length}</div>` : html``}
        </div>
        <div class="resource-menu-container">
          ${showToolbar ? html`
            <div class="${toolbarClasses}">
              ${this.config.title ? html`<div class="header-leading">
                <div class="card-title" title="${this.config.title}">${this.config.title}</div>
              </div>` : html``}
              ${hasDateSearch ? html`<div class="date-filter-container">
                <input type="date" class="date-picker" aria-label="按日期筛选" @change="${this._handleDateChange}" .value="${this._formatDateForInput(this.selectedDate)}">
              </div>` : html``}
              <div class="header-trailing">
                ${hasDateSearch ? html`<button type="button" class="action-text btn-clear-date" @click="${this._clearDateFilter}" style="visibility: ${this._isDateFiltered ? 'visible' : 'hidden'};">清除</button>` : html``}
                ${this.config.show_reload ? html`<button type="button" class="icon-button btn-reload" @click="${this._reloadResources}" ?disabled=${this._isLoading} aria-label="刷新媒体" title="刷新媒体">
                  <ha-icon icon="mdi:refresh"></ha-icon>
                </button>` : html``}
              </div>
            </div>
          ` : html``}
          ${hasErrors ? html`<div class="error-list" role="status">
            ${this.errors.map(error => html`<hui-warning>${error}</hui-warning>`)}
          </div>` : html``}
          <div class="resource-menu">
            ${this._isLoading ? this._renderMenuLoadingState() : !hasResources ? html`<div class="menu-empty">暂无媒体</div>` : repeat(
        resources.slice(0, this._itemsToShow),
        // Keyed by position and identity so lazily assigned src values never leak onto another resource.
        (resource, index) => `${index}:${this._getResourceKey(resource)}`,
        (resource, index) => this._renderThumbnail(resource, index)
      )}
            ${!this._isLoading && this._itemsToShow < resources.length ?
        html`<button type="button" class="load-more" @click="${this._loadMore}">更多 (${resources.length - this._itemsToShow})</button>` :
        html``
      }
          </div>
        </div>
        <dialog class="modal" @click="${this._handleModalClick}" @close="${this._handleModalClosed}" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
          <button type="button" class="modal-close" @click="${this._closeImageModal}" aria-label="关闭预览" title="关闭预览"><ha-icon icon="mdi:close"></ha-icon></button>
          ${this._isModalOpen && currentResource ? this._renderModalContent(currentResource) : html``}
        </dialog>
      </ha-card>
    `;
  }

  _renderThumbnail(resource, index) {
    const label = resource.caption || resource.name || `媒体 ${index + 1}`;
    const isSelected = index === this.currentResourceIndex;
    const isVideo = !resource.isHass && !this._isImageResource(resource);
    const showDuration = isVideo && (this.config.show_duration ?? true);
    let media;

    if (resource.pendingAuth) {
      media = html`<div class="thumbnail-loading" data-resource-index="${index}">
        <div class="skeleton-media"></div>
      </div>`;
    } else if (resource.resolveError || resource.thumbnailError) {
      media = html`<div class="thumbnail-error">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>加载失败</span>
      </div>`;
    } else if (resource.isHass) {
      media = html`<hui-image
        .hass=${this._hass}
        .cameraImage=${resource.name}
        .cameraView=${"auto"}
        .fitMode=${"cover"}
      ></hui-image>`;
    } else if (!isVideo) {
      media = html`<img class="lzy_img" data-src="${resource.url}" @error="${() => this._handleThumbnailError(resource)}" alt="${label}" decoding="async" draggable="false"/>`;
    } else if (this.config.video_preload ?? true) {
      media = html`<video class="lzy_video" preload="metadata" data-src="${resource.url}#t=${(this.config.preview_video_at === undefined) ? 0.1 : this.config.preview_video_at}" @error="${() => this._handleThumbnailError(resource)}" @loadedmetadata="${event => this._videoMetadataLoaded(event)}" muted playsinline></video>`;
    } else {
      media = html`<div class="video-placeholder"><ha-icon class="play-icon" icon="mdi:movie-play-outline"></ha-icon></div>`;
    }

    return html`
      <figure id="resource${index}" @click="${() => this._selectResource(index)}" @keydown="${event => this._handleResourceKeydown(event, index)}" class="${isSelected ? 'selected' : ''}" tabindex="0" role="button" aria-current="${isSelected ? 'true' : 'false'}" aria-label="${label}">
        ${media}
        ${showDuration ? html`<span class="duration"></span>` : html``}
        ${resource.caption ? html`<figcaption>${resource.caption}</figcaption>` : html``}
      </figure>
    `;
  }

  _renderModalContent(resource) {
    let media;

    if (resource.pendingAuth) {
      media = this._renderLoadingState("正在加载预览...");
    } else if (resource.resolveError) {
      media = this._renderErrorState("媒体加载失败");
    } else if (resource.isHass) {
      media = html`<hui-image class="modal-media" .hass=${this._hass} .cameraImage=${resource.name} .cameraView=${"auto"} .fitMode=${"contain"}></hui-image>`;
    } else if (this._isImageResource(resource)) {
      media = html`<img class="modal-media" src="${resource.url}" alt="${resource.caption || resource.name}">`;
    } else {
      media = html`<video class="modal-media" controls autoplay .muted=${Boolean(this.config.video_muted)} ?loop=${this.config.video_loop} src="${resource.url}" playsinline webkit-playsinline></video>`;
    }

    return html`
      ${media}
      ${resource.caption ? html`<div class="modal-caption">${resource.caption}</div>` : html``}
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

  _renderEmptyState(label) {
    return html`
      <div class="empty-state">
        <ha-icon icon="mdi:image-off-outline"></ha-icon>
        <div class="empty-label">${label}</div>
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
      <figure class="resource-skeleton" aria-hidden="true">
        <div class="skeleton-media"></div>
        <div class="skeleton-caption"></div>
      </figure>
    `);
  }

  connectedCallback() {
    super.connectedCallback();
    this._createImageObserver();
    // Dashboards detach and re-attach cards when switching views; restore what disconnectedCallback tore down.
    if (this.resources !== undefined) this._addKeyNavigationListener();
    if (this.config) this._doSlideShow(true);
    this.requestUpdate();
  }

  updated() {
    this._createImageObserver();
    const lazyElements = this.shadowRoot.querySelectorAll("img.lzy_img[data-src], video.lzy_video[data-src], .thumbnail-loading[data-resource-index]");

    for (const element of lazyElements) this.imageObserver.observe(element);
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
      date_search_adjacent_days: Number.isFinite(dateSearchAdjacentDays) && dateSearchAdjacentDays >= 0 ? Math.min(dateSearchAdjacentDays, 7) : 1
    };
    if (previousEntities !== JSON.stringify(entities)) this._clearBrowseCache();
    this._itemsToShow = this.config.items_per_page;
    this._previewErrorIndex = undefined;

    if (this._hass !== undefined)
      this._loadResources(this._hass);

    this._doSlideShow(true);
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
    this._closeImageModal();
    if (this.imageObserver) {
      this.imageObserver.disconnect();
    }
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

    if (!firstTime && !this._isPreviewVideoPlaying())
      this._selectResource(this.currentResourceIndex + 1, true);

    const time = Number.parseInt(this.config?.slideshow_timer);

    if (this.isConnected && Number.isFinite(time) && time > 0) {
      this._slideshowTimer = setTimeout(() => { this._doSlideShow(); }, (time * 1000));
    }
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

    // Manual navigation restarts the countdown so the slideshow doesn't skip right after a user choice.
    if (!fromSlideshow && this._slideshowTimer) this._doSlideShow(true);

    const selectedIndex = this.currentResourceIndex;

    this.updateComplete.then(() => this._scrollThumbnailIntoView(selectedIndex));
  }

  // Scrolls only the thumbnail list itself; Element.scrollIntoView would also scroll the dashboard,
  // which on mobile pushes the preview off-screen on every navigation.
  _scrollThumbnailIntoView(index) {
    const menu = this.shadowRoot?.querySelector(".resource-menu");
    const thumbnail = this.shadowRoot?.querySelector(`#resource${index}`);

    if (!menu || !thumbnail || index !== this.currentResourceIndex) return;

    const menuRect = menu.getBoundingClientRect();
    const thumbnailRect = thumbnail.getBoundingClientRect();
    const margin = 12;
    let top = menu.scrollTop;
    let left = menu.scrollLeft;

    if (menu.scrollHeight > menu.clientHeight) {
      if (thumbnailRect.top < menuRect.top) top += thumbnailRect.top - menuRect.top - margin;
      else if (thumbnailRect.bottom > menuRect.bottom) top += thumbnailRect.bottom - menuRect.bottom + margin;
    }
    if (menu.scrollWidth > menu.clientWidth) {
      if (thumbnailRect.left < menuRect.left) left += thumbnailRect.left - menuRect.left - margin;
      else if (thumbnailRect.right > menuRect.right) left += thumbnailRect.right - menuRect.right + margin;
    }

    if (top !== menu.scrollTop || left !== menu.scrollLeft)
      menu.scrollTo({ top, left, behavior: "smooth" });
  }

  _currentResource() {
    return this.resources?.[this.currentResourceIndex];
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

    if (Number.isFinite(event.target.duration) && durationElement) {
      durationElement.textContent = this._getFormattedVideoDuration(event.target.duration);
    }

    if (this.config.video_muted)
      event.target.muted = true;
  }

  _videoHasEnded() {
    if (this.config.slideshow_video_end) {
      this._clearSlideshowTimer();
      this._doSlideShow();
    }
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
  _popupImage() {
    const modal = this.shadowRoot.querySelector("dialog.modal");

    if (!modal || modal.open) return;

    this._isModalOpen = true;
    modal.showModal();
  }

  _closeImageModal() {
    const modal = this.shadowRoot?.querySelector("dialog.modal");

    if (modal?.open) modal.close();
    this._isModalOpen = false;
  }

  _handleModalClick(event) {
    // Clicks on the backdrop area target the dialog itself; clicks on the media do not.
    if (event.target === event.currentTarget) this._closeImageModal();
  }

  _handleModalClosed() {
    this._isModalOpen = false;
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
    let minutes = Number.parseInt(duration / 60);

    if (minutes < 10)
      minutes = "0" + minutes;

    let seconds = Number.parseInt(duration % 60);

    seconds = "0" + seconds;
    seconds = seconds.slice(Math.max(0, seconds.length - 2));

    return minutes + ":" + seconds;
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
    if (event.target.value) {
      this.selectedDate = dayjs(event.target.value).toDate();
    } else {
      this.selectedDate = null;
    }
    this._isDateFiltered = this.selectedDate !== null;
    this._loadResources(this._hass);
  }

  _clearDateFilter() {
    this.selectedDate = null;
    this._isDateFiltered = false;
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
        --gallery-card-primary-color: var(--primary-color, #03a9f4);
        --gallery-card-text-color: var(--primary-text-color, #212121);
        --gallery-card-bg-color: var(--card-background-color, #fff);
        --gallery-card-sidebar-width: clamp(220px, 25%, 360px);
        --gallery-card-strip-item-width: 160px;
        display: block;
        container: gallery-card / inline-size;
      }
      ha-card {
        /* Override --gallery-card-height (e.g. with card-mod) to fit other dashboard layouts. */
        height: var(--gallery-card-height, calc(100dvh - var(--header-height, 56px)));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--gallery-card-bg-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2));
      }

      /* Preview */
      .resource-viewer {
        position: relative;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        background: radial-gradient(circle, #2c2c2c 0%, #111 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      .resource-viewer::after {
        content: "";
        position: absolute;
        inset: 0;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.4);
        pointer-events: none;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
        margin: 0;
        box-sizing: border-box;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: opacity 0.3s ease;
      }
      hui-image {
        display: block;
        width: 100%;
        height: 100%;
      }
      .preview-image {
        cursor: zoom-in;
      }
      .resource-viewer hui-image {
        cursor: pointer;
      }
      .loading-state,
      .empty-state {
        width: 100%;
        height: 100%;
        min-height: 160px;
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
        width: 36px;
        height: 36px;
        border: 3px solid rgba(255, 255, 255, 0.24);
        border-top-color: var(--gallery-card-primary-color);
        border-radius: 50%;
        animation: gallery-card-spin 0.8s linear infinite;
      }
      .loading-label,
      .empty-label {
        font-size: 0.95em;
        font-weight: 500;
      }
      .empty-state ha-icon {
        --mdc-icon-size: 42px;
        opacity: 0.75;
      }
      .error-state ha-icon {
        color: var(--error-color, #db4437);
      }
      .viewer-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        pointer-events: none;
        z-index: 1;
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
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease, background 0.2s ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      .nav-icon-btn ha-icon {
        --mdc-icon-size: 30px;
      }
      .resource-viewer:hover .nav-icon-btn,
      .nav-icon-btn:focus-visible {
        opacity: 1;
      }
      .nav-icon-btn:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      .viewer-counter {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        padding: 2px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: 0.8em;
        font-variant-numeric: tabular-nums;
        line-height: 1.6;
        pointer-events: none;
      }
      @media (hover: none) {
        /* Touch screens have no hover to reveal the arrows. */
        .nav-icon-btn {
          opacity: 0.82;
        }
      }

      /* Thumbnail list */
      .resource-menu-container {
        container: gallery-menu / inline-size;
        flex: none;
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
        background: var(--secondary-background-color, #f5f5f5);
        overflow: hidden;
      }
      .card-header-actions {
        flex: none;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        min-height: 48px;
        box-sizing: border-box;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        background: var(--gallery-card-bg-color);
      }
      .header-leading {
        grid-column: 1;
        min-width: 0;
      }
      .card-title {
        color: var(--gallery-card-text-color);
        font-size: 0.95em;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .date-filter-container {
        grid-column: 2;
        display: flex;
        align-items: center;
        min-width: 0;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 4px 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        height: 32px;
        box-sizing: border-box;
      }
      .date-filter-container:focus-within {
        border-color: var(--gallery-card-primary-color);
      }
      .date-picker {
        min-width: 0;
        width: 100%;
        border: none;
        background: transparent;
        color: var(--gallery-card-text-color);
        font-family: inherit;
        outline: none;
        font-size: 0.95em;
        cursor: pointer;
        text-align: center;
        height: 24px;
        line-height: normal;
      }
      .header-trailing {
        grid-column: 3;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
        min-width: 0;
      }
      /* Narrow lists: put the title on its own row so the date picker and actions never overlap. */
      @container gallery-menu (max-width: 339px) {
        .card-header-actions.has-date {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .has-date .header-leading {
          grid-column: 1 / -1;
        }
        .has-date .date-filter-container {
          grid-column: 1;
        }
        .has-date .header-trailing {
          grid-column: 2;
        }
      }
      .action-text {
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        border: 0;
        background: transparent;
        font-family: inherit;
        font-size: 0.9em;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s;
        white-space: nowrap;
      }
      .btn-clear-date {
        color: var(--error-color, #db4437);
      }
      .icon-button {
        width: 32px;
        height: 32px;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--gallery-card-text-color);
        cursor: pointer;
      }
      .icon-button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .action-text:hover,
      .icon-button:hover:not(:disabled),
      .load-more:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      }
      .icon-button:hover:not(:disabled) {
        color: var(--gallery-card-primary-color);
      }
      .action-text:focus-visible,
      .icon-button:focus-visible,
      .load-more:focus-visible,
      .modal-close:focus-visible {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 1px;
      }
      .error-list {
        flex: none;
        max-height: 112px;
        padding: 8px;
        overflow-y: auto;
        box-sizing: border-box;
        background: var(--gallery-card-bg-color);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .resource-menu {
        padding: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        grid-auto-rows: max-content;
        gap: 12px;
        overflow-y: auto;
        align-content: start;
        min-height: 0;
        width: 100%;
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3) transparent;
      }
      .resource-menu::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      .resource-menu::-webkit-scrollbar-thumb {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
        border-radius: 4px;
      }
      .resource-menu figure {
        margin: 0;
        width: 100%;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        background: #222;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        aspect-ratio: 16 / 9;
        align-self: start;
        box-sizing: border-box;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .resource-menu figure:not(.resource-skeleton):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.4);
        }
      }
      .resource-menu figure.selected {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
      }
      .resource-menu figure:focus-visible {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 2px;
      }
      .resource-skeleton {
        cursor: default;
        box-shadow: none;
        pointer-events: none;
      }
      .skeleton-media {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #242424 0%, #363636 45%, #242424 90%);
        background-size: 220% 100%;
        animation: gallery-card-shimmer 1.2s ease-in-out infinite;
      }
      .skeleton-caption {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 8px;
        height: 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
      }
      .menu-empty {
        grid-column: 1 / -1;
        flex: 1 1 auto;
        padding: 20px 8px;
        color: var(--secondary-text-color, #727272);
        text-align: center;
        font-size: 0.9em;
      }
      .thumbnail-loading,
      .thumbnail-error,
      .video-placeholder {
        width: 100%;
        height: 100%;
      }
      .thumbnail-error,
      .video-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: rgba(255, 255, 255, 0.76);
        font-size: 0.78em;
      }
      .thumbnail-error ha-icon,
      .video-placeholder ha-icon {
        --mdc-icon-size: 28px;
      }
      .resource-menu img,
      .resource-menu video {
        object-fit: cover;
      }
      .resource-menu .lzy_img:not([src]),
      .resource-menu .lzy_video:not([src]) {
        opacity: 0;
      }
      .resource-menu figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px 6px;
        font-size: 0.7em;
        color: #fff;
        text-align: center;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
      .duration {
        position: absolute;
        top: 4px;
        right: 4px;
        padding: 0 5px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        font-size: 0.68em;
        font-variant-numeric: tabular-nums;
        line-height: 1.6;
        pointer-events: none;
      }
      .duration:empty {
        display: none;
      }
      @container gallery-card (min-width: 600px) {
        .resource-menu figcaption {
          font-size: 0.85em;
        }
      }
      .load-more {
        grid-column: 1 / -1;
        width: 100%;
        text-align: center;
        padding: 6px;
        border: 0;
        background: transparent;
        font: inherit;
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        font-weight: 500;
        transition: background 0.2s;
        border-radius: 4px;
      }

      /* Layout modes (wide cards) */
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
      .menu-responsive .resource-menu-container,
      .menu-right .resource-menu-container,
      .menu-left .resource-menu-container {
        width: var(--gallery-card-sidebar-width);
      }
      .menu-responsive .resource-menu,
      .menu-right .resource-menu,
      .menu-left .resource-menu {
        flex: 1 1 0;
        grid-template-columns: minmax(0, 1fr);
      }
      .menu-top .resource-menu,
      .menu-bottom .resource-menu {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-top .resource-menu figure,
      .menu-bottom .resource-menu figure {
        flex: 0 0 var(--gallery-card-strip-item-width);
      }
      .menu-top .load-more,
      .menu-bottom .load-more {
        flex: none;
        width: auto;
        padding: 6px 16px;
        white-space: nowrap;
      }
      .menu-hidden .resource-menu-container {
        display: none;
      }

      /* Narrow cards: preview on top with a fixed ratio, thumbnails as a grid below.
         ha-card[class] outranks the per-mode selectors above without !important. */
      @container gallery-card (max-width: 599px) {
        ha-card[class] {
          flex-direction: column;
          height: auto;
        }
        ha-card[class] .resource-viewer {
          flex: none;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 70dvh;
        }
        ha-card[class] .resource-menu-container {
          width: 100%;
        }
        ha-card[class] .resource-menu {
          display: grid;
          flex: none;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          overflow: visible;
        }
        ha-card[class] .load-more {
          width: 100%;
        }
        .card-header-actions {
          padding: 6px 12px;
        }
        .nav-icon-btn {
          opacity: 0.82;
          width: 38px;
          height: 38px;
        }
      }
      @container gallery-card (max-width: 340px) {
        ha-card[class] .resource-menu {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      /* Full-screen preview */
      .modal {
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
        background: rgba(0, 0, 0, 0.95);
        color: #fff;
        box-sizing: border-box;
      }
      .modal[open] {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 56px max(16px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
      }
      .modal::backdrop {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);
      }
      .modal-media {
        flex: 0 1 auto;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        min-height: 0;
        object-fit: contain;
        animation: zoom 0.3s;
      }
      hui-image.modal-media {
        width: 100%;
        height: 100%;
      }
      .modal-caption {
        flex: none;
        max-width: 100%;
        text-align: center;
        font-size: 1.1em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .modal-close {
        position: absolute;
        z-index: 1;
        top: max(8px, env(safe-area-inset-top));
        right: max(8px, env(safe-area-inset-right));
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        cursor: pointer;
      }
      .modal-close:hover {
        background: rgba(255, 255, 255, 0.24);
      }
      .modal-close ha-icon {
        --mdc-icon-size: 28px;
      }
      @keyframes zoom {
        from { transform: scale(0.92); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes gallery-card-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes gallery-card-shimmer {
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
