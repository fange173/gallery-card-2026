import { LitElement, html, css } from "lit-element";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const GalleryCardVersion = "2026.0.1";

class GalleryCard extends LitElement {
  static get properties() {
    return {
      _hass: {},
      config: {},
      resources: { type: Array },
      currentResourceIndex: { type: Number },
      selectedDate: { type: Object },
      _itemsToShow: { type: Number },
      _isDateFiltered: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.resources = undefined;
    this.currentResourceIndex = 0;
    this._itemsToShow = 10;
    this.selectedDate = null;
    this._isDateFiltered = false;
    this._isInitialLoad = false;
    this._isLoading = false;
  }

  render() {
    const menuAlignment = (this.config.menu_alignment || "responsive").toLowerCase();
    const resources = this.resources || [];

    return html`
      ${this.errors === undefined ? html`` :
        this.errors.map((error) => {
          return html`<hui-warning>${error}</hui-warning>`;
        })}
      <ha-card class="menu-${menuAlignment}">
        <div class="resource-viewer" @touchstart="${event => this._handleTouchStart(event)}" @touchmove="${event => this._handleTouchMove(event)}">
          <figure style="margin:5px;">
            ${this._currentResource().isHass ?
        html`
                  <hui-image @click="${event => this._popupCamera(event)}"
                                      .hass=${this._hass}
                                      .cameraImage=${this._currentResource().name}
                                      .cameraView=${"live"}
                                    ></hui-image>
                ` :
        this._isImageExtension(this._currentResource().extension) ?
          html`<img @click="${event => this._popupImage(event)}" src="${this._currentResource().url}"/>` :
          html`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay} src="${this._currentResource().url}#t=0.1" @loadedmetadata="${event => this._videoMetadataLoaded(event)}" @canplay="${event => this._startVideo(event)}" 
                            @ended="${() => this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`
      }
          </figure>
          <div class="viewer-nav">
            <div class="nav-text-btn nav-left" @click="${() => this._selectResource(this.currentResourceIndex - 1)}">上一个</div> 
            <div class="nav-text-btn nav-right" @click="${() => this._selectResource(this.currentResourceIndex + 1)}">下一个</div> 
          </div>
        </div>
        <div class="resource-menu-container">
          ${(this.config.enable_date_search ?? false) ? html`
            <div class="card-header-actions">
              <div class="date-filter-container">
                <input type="date" class="date-picker" @change="${this._handleDateChange}" .value="${this._formatDateForInput(this.selectedDate)}">
              </div>
              <span class="action-text btn-clear-date" @click="${this._clearDateFilter}" style="visibility: ${this._isDateFiltered ? 'visible' : 'hidden'};">清除</span>
            </div>
          ` : html``}
          <div class="resource-menu">
            ${resources.slice(0, this._itemsToShow).map((resource, index) => {
        return html`
                    <figure style="margin:5px;" id="resource${index}" data-imageIndex="${index}" @click="${() => this._selectResource(index)}" class="${(index === this.currentResourceIndex) ? 'selected' : ''}">
                    ${resource.isHass ?
            html`
                          <hui-image
                            .hass=${this._hass}
                            .cameraImage=${resource.name}
                            .cameraView=${"live"}
                          ></hui-image>
                        ` :
            this._isImageExtension(resource.extension) ?
              html`<img class="lzy_img" src="/local/community/gallery-card/placeholder.jpg" data-src="${resource.url}"/>` :
              (this.config.video_preload ?? true) ?
                html`<video class="lzy_video" preload="metadata" data-src="${resource.url}#t=${(this.config.preview_video_at === undefined) ? 0.1 : this.config.preview_video_at}" @loadedmetadata="${event => this._videoMetadataLoaded(event)}"></video>` :
                html`<div style="text-align: center"><div class="lzy_img"><ha-icon id="play" icon="mdi:movie-play-outline"></ha-icon></div></div>`
          }
                    <figcaption>${resource.caption}</figcaption>
                    </figure>
                  `;
      })}
            ${this._itemsToShow < resources.length ?
        html`<div class="load-more" @click="${this._loadMore}">更多 (${resources.length - this._itemsToShow})</div>` :
        html``
      }
          </div>
        </div>
        <div id="imageModal" class="modal" @touchstart="${event => this._handleTouchStart(event)}" @touchmove="${event => this._handleTouchMove(event)}">
          <img class="modal-content" id="popupImage">
          <div id="popupCaption"></div>
        </div>
      </ha-card>
    `;
  }

  // eslint-disable-next-line no-unused-vars
  updated(changedProperties) {
    const mediaArray = this.shadowRoot.querySelectorAll('img.lzy_img, video.lzy_video');

    for (const v of mediaArray) {
      this.imageObserver.observe(v);
    }
  }

  setConfig(config) {
    dayjs.extend(customParseFormat);
    dayjs.extend(relativeTime);

    this.imageObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const lazyMedia = entry.target;

          if (lazyMedia.dataset.src) {
            lazyMedia.src = lazyMedia.dataset.src;
            if (lazyMedia.tagName === 'VIDEO') {
              lazyMedia.load();
            }
            delete lazyMedia.dataset.src;
          }
        }
      }
    });
    if (!config.entity && !config.entities) {
      throw new Error("Required configuration for entities is missing");
    }

    this.config = config;
    this._itemsToShow = this.config.items_per_page || 10;

    if (this.config.entity) {
      if (!this.config.entities) {
        this.config = { ...this.config, entities: [] };
      }
      this.config.entities.push(this.config.entity);
      delete this.config.entity;
    }

    if (this._hass !== undefined)
      this._loadResources(this._hass);

    this._doSlideShow(true);
  }

  set hass(hass) {
    this._hass = hass;

    if (this.resources === undefined)
      this._loadResources(this._hass);
  }

  getCardSize() {
    return 1;
  }

  _isImageExtension(extension) {
    return (extension.match(/(jpeg|jpg|gif|png|tiff|bmp)$/));
  }

  _doSlideShow(firstTime) {
    if (!firstTime)
      this._selectResource(this.currentResourceIndex + 1, true);

    if (this.config.slideshow_timer) {
      const time = Number.parseInt(this.config.slideshow_timer);

      if (!Number.isNaN(time) && time > 0) {
        setTimeout(() => { this._doSlideShow(); }, (time * 1000));
      }
    }
  }

  _loadMore() {
    const step = this.config.items_per_page || 10;
    this._itemsToShow += step;
  }

  _selectResource(index, fromSlideshow) {
    this.autoPlayVideo = true;

    let nextResourceIndex = index;

    if (index < 0)
      nextResourceIndex = this.resources.length - 1;
    else if (index >= this.resources.length)
      nextResourceIndex = 0;

    // 如果选中的索引超出了当前显示范围，自动加载更多
    if (nextResourceIndex >= this._itemsToShow) {
      this._itemsToShow = nextResourceIndex + 10;
    }

    this.currentResourceIndex = nextResourceIndex;
    this._loadImageForPopup();

    if (fromSlideshow && this.parentNode && this.parentNode.tagName && this.parentNode.tagName.toLowerCase() === "hui-card-preview") {
      return;
    }

    const elt = this.shadowRoot.querySelector("#resource" + this.currentResourceIndex);

    if (elt)
      elt.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }

  _getResource(index) {
    return this.resources !== undefined && index !== undefined && this.resources.length > 0 ? this.resources[index] : {
      url: "",
      name: "",
      extension: "jpg",
      caption: index === undefined ? "Loading resources..." : "No images or videos to display",
      index: 0
    };
  }

  _currentResource() {
    return this._getResource(this.currentResourceIndex);
  }

  _startVideo(event) {
    if (this.autoPlayVideo)
      event.target.play();
  }

  _videoMetadataLoaded(event) {
    const showDuration = this.config.show_duration ?? true;
    const durationElement = event.target.closest('figure')?.querySelector(".duration");

    if (!Number.isNaN(Number.parseInt(event.target.duration)) && showDuration && durationElement) {
      durationElement.innerHTML = "[" + this._getFormattedVideoDuration(event.target.duration) + "]";
    }

    if (this.config.video_muted)
      event.target.muted = "muted";
  }

  _videoHasEnded() {
    if (this.config.slideshow_video_end) {
      this._doSlideShow();
    }
  }

  _popupCamera() {
    const event = new Event("hass-more-info", {
      bubbles: true,
      composed: true
    });

    event.detail = { entityId: this._currentResource().name };
    this.dispatchEvent(event);
  }

  _popupImage() {
    const modal = this.shadowRoot.querySelector("#imageModal");

    modal.style.display = "block";
    this._loadImageForPopup();
    modal.scrollIntoView(true);

    modal.addEventListener('click', function () {
      modal.style.display = "none";
    });
  }

  _loadImageForPopup() {
    const modal = this.shadowRoot.querySelector("#imageModal");
    const modalImg = this.shadowRoot.querySelector("#popupImage");
    const captionText = this.shadowRoot.querySelector("#popupCaption");

    if (modal.style.display === "block") {
      modalImg.src = this._currentResource().url;
      captionText.innerHTML = this._currentResource().caption;
    }
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
    switch (event.code) {
      case "ArrowDown":
      case "ArrowRight": {
        this._selectResource(this.currentResourceIndex + 1);
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
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
    if (!this.xDown || !this.yDown) {
      return;
    }
    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/* most significant */
      if (xDiff > 0) {
        /* left swipe */
        this._selectResource(this.currentResourceIndex + 1);
        event.preventDefault();
      } else {
        /* right swipe */
        this._selectResource(this.currentResourceIndex - 1);
        event.preventDefault();
      }
    } else {
      // if ( yDiff > 0 ) {
      /* up swipe */
      // } else {
      /* down swipe */
      // }
    }

    /* reset values */
    this.xDown = undefined;
    this.yDown = undefined;
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
    if (this._isLoading) return;
    this._isLoading = true;

    this.currentResourceIndex = undefined;
    this.resources = [];

    let filterForDate = (this.config.enable_date_search ?? false) && this._isDateFiltered;

    let maximumFilesRaw = this.config.maximum_files;
    if (maximumFilesRaw === 0) maximumFilesRaw = undefined;

    const maximumFilesPerEntity = this.config.maximum_files_per_entity ?? true;
    const maximumFiles = maximumFilesPerEntity ? maximumFilesRaw : undefined;
    const maximumFilesTotal = maximumFilesPerEntity ? undefined : maximumFilesRaw;

    let folderFormat = this._convertOldFormat(this.config.folder_format);
    let fileNameFormat = this._convertOldFormat(this.config.file_name_format);
    let fileNameDateBegins = this.config.file_name_date_begins;
    let captionFormat = this._convertOldFormat(this.config.caption_format);
    const parsedDateSort = this.config.parsed_date_sort ?? false;
    const reverseSort = this.config.reverse_sort ?? true;
    const randomSort = this.config.random_sort ?? false;

    const fetchAll = () => {
      const entityCommands = [];

      for (const entity of this.config.entities) {
        let entityId;
        let recursive = false;
        let includeVideo = true;
        let includeImages = true;

        if (typeof entity === "object") {
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

        if (entityId.substring(0, 15).toLowerCase() === "media-source://") {
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
              entityCommands.push(this._loadFilesResources(entityState.attributes.fileList, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort));

            if (entityState.attributes.file_list !== undefined)
              entityCommands.push(this._loadFilesResources(entityState.attributes.file_list, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort));
          }
        }
      }
      return entityCommands;
    };

    try {
      let resources = await Promise.all(fetchAll());
      let flatResources = resources.filter(result => !result.error).flat(Number.POSITIVE_INFINITY);

      if (filterForDate) {
        const selectedDateStr = dayjs(this.selectedDate).format("YYYY-MM-DD");
        flatResources = flatResources.filter(resource => {
          if (!resource.date || !dayjs(resource.date).isValid()) return true;
          return dayjs(resource.date).format("YYYY-MM-DD") === selectedDateStr;
        });
      }

      // 自动回溯逻辑
      if (this._isInitialLoad && filterForDate && flatResources.length === 0) {
        let daysBack = 0;
        let tempDate = dayjs(this.selectedDate);

        while (flatResources.length === 0 && daysBack < 30) {
          daysBack++;
          tempDate = tempDate.subtract(1, "day");
          this.selectedDate = tempDate.toDate();
          resources = await Promise.all(fetchAll());
          flatResources = resources.filter(result => !result.error).flat(Number.POSITIVE_INFINITY);

          if (filterForDate) {
            const selectedDateStr = dayjs(this.selectedDate).format("YYYY-MM-DD");
            flatResources = flatResources.filter(resource => {
              if (!resource.date || !dayjs(resource.date).isValid()) return true;
              return dayjs(resource.date).format("YYYY-MM-DD") === selectedDateStr;
            });
          }
        }

        // 如果回溯了30天还没找到，则显示全部
        if (flatResources.length === 0) {
          this._isDateFiltered = false;
          filterForDate = false;
          resources = await Promise.all(fetchAll());
          flatResources = resources.filter(result => !result.error).flat(Number.POSITIVE_INFINITY);
        }
      }
      this._isInitialLoad = false;

      this.resources = flatResources;
      if (parsedDateSort) {
        if (reverseSort) {
          this.resources.sort(function (x, y) { return y.date - x.date; });
        } else {
          this.resources.sort(function (x, y) { return x.date - y.date; });
        }
      }

      if (randomSort) {
        for (let index = this.resources.length - 1; index > 0; index--) {
          const r = Math.floor(Math.random() * (index + 1));

          if (index !== r) {
            [this.resources[index], this.resources[r]] = [this.resources[r], this.resources[index]];
          }
        }
      }

      if (maximumFilesTotal !== undefined && !Number.isNaN(maximumFilesTotal) && maximumFilesTotal < this.resources.length) {
        this.resources = this.resources.filter(function (resource) {
          if (resource.isHass)
            return true;
          else if (this.count < maximumFilesTotal) {
            this.count++;
            return true;
          }
          return false;
        }, { count: this.resources.filter(resource => resource.isHass).length });
      }

      this.currentResourceIndex = 0;
      if (!(this.parentNode && this.parentNode.tagName && this.parentNode.tagName.toLowerCase() === "hui-card-preview")) {
        document.addEventListener("keydown", event => this._keyNavigation(event));
      }

      this.errors = [];
      for (const error of resources.filter(result => result.error).flat(Number.POSITIVE_INFINITY)) {
        this.errors.push(error.message + " " + error.entity);
        this._hass.callService("system_log", "write", {
          message: "Gallery Card Error:  " + error.message + "   " + error.entity
        });
      }
    } finally {
      this._isLoading = false;
    }
  }

  _loadMediaResource(hass, contentId, maximumFiles, folderFormat, fileNameFormat, fileNameDateBegins, captionFormat, recursive, reverseSort, includeVideo, includeImages, filterForDate) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      let mediaPath = contentId;

      try {
        let values = [];

        if (folderFormat && reverseSort && maximumFiles !== undefined && !Number.isNaN(maximumFiles)) {  // Can do more targeted folder searching under these conditions
          let date = dayjs();
          let folderPrevious = "";
          const failedPaths = [];

          while (values.length < maximumFiles) {
            const folder = date.format(folderFormat);

            mediaPath = contentId + "/" + folder;

            if (folder !== folderPrevious) {
              try {
                const folderValues = await this._loadMedia(this, hass, mediaPath, maximumFiles, false, reverseSort, includeVideo, includeImages, filterForDate);

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

          if (values.length > maximumFiles)
            values.length = maximumFiles;
        } else
          values = await this._loadMedia(this, hass, mediaPath, maximumFiles, recursive, reverseSort, includeVideo, includeImages, filterForDate);

        const resources = [];

        for (const mediaItem of values) {
          const resource = this._createFileResource(mediaItem.authenticated_path, fileNameFormat, fileNameDateBegins, captionFormat);

          if (resource !== undefined) {
            resources.push(resource);
          }
        }
        resolve(resources);
      } catch (error) {
        console.log(error);
        resolve({
          error: true,
          entity: mediaPath,
          message: error.message
        });
      }

    });
  }

  _loadMedia(reference, hass, contentId, maximumFiles, recursive, reverseSort, includeVideo, includeImages, filterForDate) {
    const mediaItem = {
      media_class: "directory",
      media_content_id: contentId
    };

    if (contentId.substring(contentId.length - 1, contentId.length) !== "/" && contentId !== "media-source://media_source") {
      mediaItem.media_content_id += "/";
    }

    return Promise.all(this._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate))
      .then(function (values) {
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

        return Promise.all(mediaItems.map(function (mediaItem) {
          return reference._fetchMediaItem(hass, mediaItem.media_content_id)
            .then(function (auth) {
              return {
                ...mediaItem,
                authenticated_path: auth.url
              };
            });
        }));
      });
  }

  _fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate) {
    const commands = [];

    if (mediaItem.media_class === "directory") {
      if (mediaItem.children) {
        commands.push(
          ...mediaItem.children
            .filter(mediaItem => {
              return ((includeVideo && mediaItem.media_class === "video") ||
                (includeImages && mediaItem.media_class === "image") ||
                (recursive && mediaItem.media_class === "directory" && (!filterForDate ||
                  (mediaItem.title === reference._folderDateFormatter((reference.config.search_date_folder_format === undefined) ? "DD_MM_YYYY" : reference.config.search_date_folder_format, reference.selectedDate))))) &&
                mediaItem.title !== "@eaDir/";
            })
            .map(mediaItem => {
              return Promise.all(reference._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate));
            }));
      }
      else {
        commands.push(
          reference._fetchMediaContents(hass, mediaItem.media_content_id)
            .then(mediaItem => {
              return Promise.all(reference._fetchMedia(reference, hass, mediaItem, recursive, includeVideo, includeImages, filterForDate));
            })
        );
      }
    }

    if (mediaItem.media_class !== "directory") {
      commands.push(Promise.resolve(mediaItem));
    }

    return commands;
  }

  _fetchMediaContents(hass, contentId) {
    return hass.callWS({
      type: "media_source/browse_media",
      media_content_id: contentId
    });
  }

  _fetchMediaItem(hass, mediaItemPath) {
    return hass.callWS({
      type: "media_source/resolve_media",
      media_content_id: mediaItemPath,
      expires: (60 * 60 * 3)  // 3 hours
    });
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

  _loadFilesResources(files, maximumFiles, fileNameFormat, fileNameDateBegins, captionFormat, reverseSort) {
    const resources = [];

    if (files) {
      files = files.filter(file => !file.includes("@eaDir"));

      if (reverseSort)
        files.reverse();

      if (maximumFiles !== undefined && !Number.isNaN(maximumFiles) && maximumFiles < files.length) {
        files.length = maximumFiles;
      }

      for (const file of files) {
        const filePath = file;
        // /config/downloads/front_door/
        // /config/www/...
        let fileUrl = filePath.replace("/config/www/", "/local/");

        if (!filePath.includes("/config/www/"))
          fileUrl = "/local/" + filePath.slice(Math.max(0, filePath.indexOf("/www/") + 5));

        const resource = this._createFileResource(fileUrl, fileNameFormat, fileNameDateBegins, captionFormat);

        if (resource !== undefined) {
          resources.push(resource);
        }
      }
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
      const arFileName = fileName.split(".");
      const extension = arFileName.at(-1).toLowerCase();

      fileName = fileName.slice(0, Math.max(0, fileName.length - extension.length - 1));
      fileName = decodeURIComponent(fileName);

      if (captionFormat !== " ")
        fileCaption = fileName;

      let fileDatePart = fileName;

      if (fileNameDateBegins && !Number.isNaN(Number.parseInt(fileNameDateBegins)))
        fileDatePart = fileDatePart.slice(Math.max(0, Number.parseInt(fileNameDateBegins) - 1));
      console.log(fileDatePart);
      if (fileNameFormat)
        date = dayjs(fileDatePart, fileNameFormat);

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
        date
      };
    }

    return resource;
  }

  _folderDateFormatter(folderFormat, date) {
    return dayjs(date).format(folderFormat);
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
      }
      .content {
        overflow: hidden;
      }
      ha-card {
        height: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        background: var(--gallery-card-bg-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2));
      }
      .resource-viewer {
        position: sticky;
        top: var(--header-height, 56px);
        z-index: 2;
        width: 100%;
        background: radial-gradient(circle, #2c2c2c 0%, #111 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        align-self: flex-start;
        height: calc(100vh - var(--header-height, 56px));
        max-height: calc(100vh - var(--header-height, 56px));
      }
      .resource-viewer::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.4);
        pointer-events: none;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: opacity 0.3s ease;
      }
      .resource-menu-container {
        display: flex;
        flex-direction: column;
        background: var(--secondary-background-color, #f5f5f5);
        overflow-y: auto;
      }
      .card-header-actions {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        padding: 8px 16px;
        min-height: 48px;
        box-sizing: border-box;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        background: var(--gallery-card-bg-color);
      }
      @media all and (max-width: 599px) {
        .card-header-actions {
          padding: 6px 12px;
        }
      }
      .action-text {
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        font-size: 0.9em;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s;
        white-space: nowrap;
      }
      .action-text:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      }
      .btn-clear-date {
        grid-column: 3;
        justify-self: end;
        color: var(--error-color, #db4437);
      }
      .date-filter-container {
        grid-column: 2;
        display: flex;
        align-items: center;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 20px;
        padding: 4px 16px;
        border: 1px solid var(--divider-color, #e0e0e0);
        height: 32px;
        box-sizing: border-box;
      }
      .date-picker {
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
      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        color: #fff;
        text-align: center;
        box-sizing: border-box;
      }
      .caption-text {
        font-weight: 500;
        font-size: 1.1em;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .caption-details {
        font-size: 0.9em;
        opacity: 0.8;
      }
      .zoom-link {
        color: var(--gallery-card-primary-color);
        text-decoration: none;
        margin-left: 8px;
      }
      .viewer-nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        pointer-events: none;
      }
      .nav-text-btn {
        pointer-events: auto;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        user-select: none;
        font-weight: 500;
        font-size: 0.9em;
      }
      .resource-viewer:hover .nav-text-btn {
        opacity: 1;
      }
      .nav-text-btn:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      .resource-menu {
        padding: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 12px;
        overflow-y: auto;
        align-content: flex-start;
      }
      .resource-menu::-webkit-scrollbar {
        width: 4px;
      }
      .resource-menu::-webkit-scrollbar-thumb {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
        border-radius: 4px;
      }
      .resource-menu figure {
        margin: 0 !important;
        cursor: pointer;
        border-radius: 12px;
        overflow: hidden;
        background: #222;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        aspect-ratio: 16/9;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      .resource-menu figure:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.4);
      }
      .resource-menu figure.selected {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
      }
      .resource-menu img, .resource-menu video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .resource-menu figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px;
        font-size: 0.7em;
        background: rgba(0,0,0,0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @media all and (min-width: 601px) {
        .resource-menu figcaption {
          font-size: 1.1em;
        }
      }
      .load-more {
        grid-column: 1 / -1;
        text-align: center;
        padding: 6px;
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        font-weight: 500;
        transition: background 0.2s;
        border-radius: 8px;
      }
      .load-more:hover {
        background: rgba(var(--rgb-primary-color), 0.1);
      }

      /* Layout modes */
      .menu-responsive {
        flex-direction: column;
      }
      @media all and (min-width: 600px) {
        .menu-responsive {
          flex-direction: row;
        }
        .menu-responsive .resource-viewer {
          flex: 3;
        }
        .menu-responsive .resource-menu-container {
          flex: 1;
          max-height: none;
        }
        .menu-responsive .resource-menu {
          grid-template-columns: 1fr;
        }
      }
      .menu-bottom .resource-menu-container {
        order: 2;
      }
      .menu-bottom .resource-menu {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-bottom .resource-menu figure {
        min-width: 120px;
      }
      .menu-right { flex-direction: row; }
      .menu-right .resource-menu-container { width: 25%; max-height: none; }
      .menu-right .resource-menu { grid-template-columns: 1fr; }
      .menu-left { flex-direction: row-reverse; }
      .menu-left .resource-menu-container { width: 25%; max-height: none; }
      .menu-left .resource-menu { grid-template-columns: 1fr; }
      .menu-top { flex-direction: column-reverse; }
      .menu-top .resource-menu { display: flex; overflow-x: auto; overflow-y: hidden; }
      .menu-top .resource-menu figure { min-width: 120px; }
      .menu-hidden .resource-menu-container { display: none; }

      @media all and (max-width: 599px) {
        ha-card {
          flex-direction: column !important;
        }
        .resource-viewer {
          position: relative;
          top: 0;
          height: auto;
          aspect-ratio: 16/9;
          width: 100% !important;
        }
        .resource-menu-container {
          width: 100% !important;
        }
        .resource-menu {
          grid-template-columns: repeat(3, 1fr) !important;
          display: grid !important;
        }
      }

      /* Modal */
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        backdrop-filter: blur(5px);
      }
      .modal-content {
        margin: auto;
        display: block;
        max-width: 90%;
        max-height: 85%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: zoom 0.3s;
      }
      #popupCaption {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 1.2em;
      }
      @keyframes zoom {
        from {transform: translate(-50%, -50%) scale(0.8); opacity: 0;}
        to {transform: translate(-50%, -50%) scale(1); opacity: 1;}
      }
    `;
  }
}
customElements.define("gallery-card", GalleryCard);

console.groupCollapsed(`%cGALLERY-CARD ${GalleryCardVersion} IS INSTALLED`, "color: green; font-weight: bold");
console.log("Readme:", "https://github.com/lukelalo/gallery-card");
console.groupEnd();

window.customCards = window.customCards || [];
window.customCards.push({
  type: "gallery-card",
  name: "Gallery Card",
  preview: false, // Optional - defaults to false
  description: "The Gallery Card allows for viewing multiple images/videos.  Requires the Files sensor available at https://github.com/TarheelGrad1998" // Optional
});
