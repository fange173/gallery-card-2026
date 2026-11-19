import { html } from "lit-element";
import dayjs from "dayjs";

const INVALID_FILENAME_CHARS_RE = /[/\\:*?"<>|]/g;

/**
 * Strip characters that are illegal in filenames across OSes.
 */
export function sanitizeNote(note) {
  return String(note || "").replace(INVALID_FILENAME_CHARS_RE, "_").trim();
}

/**
 * Infer a dayjs timestamp from a filename using configured format, common regexes, or file mtime.
 */
export function inferDateFromFile(file, fileNameFormat, lockedDate) {
  const rawName = String(file?.name || "");
  const dotIndex = rawName.lastIndexOf(".");
  const baseName = dotIndex > 0 ? rawName.slice(0, dotIndex) : rawName;

  let parsed;

  if (fileNameFormat) {
    const candidate = dayjs(baseName, fileNameFormat, true);

    if (candidate.isValid()) parsed = candidate;
  }

  if (!parsed) {
    const fullMatch = baseName.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})[-_ T]?(\d{2})[-_:]?(\d{2})[-_:]?(\d{2})/);

    if (fullMatch) {
      const [, y, m, d, hh, mm, ss] = fullMatch;
      const candidate = dayjs(`${y}-${m}-${d} ${hh}:${mm}:${ss}`, "YYYY-MM-DD HH:mm:ss", true);

      if (candidate.isValid()) parsed = candidate;
    }
  }

  if (!parsed) {
    const dateMatch = baseName.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})/);

    if (dateMatch) {
      const [, y, m, d] = dateMatch;
      const fallbackTime = file?.lastModified ? dayjs(file.lastModified) : dayjs();
      const candidate = dayjs(`${y}-${m}-${d} ${fallbackTime.format("HH:mm:ss")}`, "YYYY-MM-DD HH:mm:ss", true);

      if (candidate.isValid()) parsed = candidate;
    }
  }

  if (!parsed) {
    parsed = file?.lastModified ? dayjs(file.lastModified) : dayjs();
  }

  if (lockedDate) {
    const locked = dayjs(lockedDate);

    if (locked.isValid()) {
      parsed = locked
        .hour(parsed.hour())
        .minute(parsed.minute())
        .second(parsed.second());
    }
  }

  return parsed;
}

/**
 * Build a unique target filename following fileNameFormat, optional note, and original extension.
 */
export function buildTargetFileName(dateStr, timeStr, fileNameFormat, originalName, note, usedNames) {
  const dotIndex = String(originalName || "").lastIndexOf(".");
  const ext = dotIndex > 0 ? originalName.slice(dotIndex).toLowerCase() : "";
  const format = fileNameFormat || "YYYYMMDDHHmmss";
  const cleanNote = sanitizeNote(note);
  const suffix = cleanNote ? `_${cleanNote}` : "";

  let dt = dayjs(`${dateStr} ${timeStr}`, ["YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD HH:mm"], false);

  if (!dt.isValid()) dt = dayjs();

  const initialFormatted = dt.format(format);
  let candidate = `${initialFormatted}${suffix}${ext}`;

  if (usedNames && usedNames.has(candidate)) {
    const canIncrementSeconds = dt.add(1, "second").format(format) !== initialFormatted;
    let resolved = false;

    if (canIncrementSeconds) {
      for (let attempt = 0; attempt < 60; attempt++) {
        dt = dt.add(1, "second");
        candidate = `${dt.format(format)}${suffix}${ext}`;
        if (!usedNames.has(candidate)) {
          resolved = true;
          break;
        }
      }
    }

    if (!resolved) {
      let seq = 1;

      do {
        candidate = `${initialFormatted}${suffix}_${seq}${ext}`;
        seq++;
      } while (usedNames.has(candidate));
    }
  }

  if (usedNames) usedNames.add(candidate);
  return { fileName: candidate, dateObj: dt };
}

/**
 * Compute target filenames and preview paths for all queued upload items.
 */
export function computeQueuePreview(items, uploadConfig) {
  const usedNames = new Set();
  const basePath = String(uploadConfig?.target_path || "media-source://media_source/local").replace(/\/+$/, "");
  const shortBase = basePath.replace(/^media-source:\/\/media_source\//, "") || "local";
  const folderFormat = uploadConfig?.folder_format || "";
  const fileNameFormat = uploadConfig?.file_name_format || "YYYYMMDDHHmmss";

  return items.map(item => {
    const { fileName, dateObj } = buildTargetFileName(
      item.dateStr,
      item.timeStr,
      fileNameFormat,
      item.file.name,
      item.note,
      usedNames
    );
    const folderName = folderFormat ? dateObj.format(folderFormat) : "";
    const targetDir = folderName ? `${basePath}/${folderName}` : basePath;
    const displayPath = folderName ? `${shortBase} / ${folderName} / ${fileName}` : `${shortBase} / ${fileName}`;

    return {
      ...item,
      targetFileName: fileName,
      folderName,
      targetDir,
      displayPath
    };
  });
}

/**
 * Ensure target folder exists under target_path, calling mkdir_service if configured.
 */
export async function ensureTargetDirectory(hass, basePath, folderName, mkdirService, forceRoot) {
  const normalizedBase = basePath.replace(/\/+$/, "");

  if (!folderName || forceRoot) return normalizedBase;

  const targetDir = `${normalizedBase}/${folderName}`;

  try {
    const rootListing = await hass.callWS({
      type: "media_source/browse_media",
      media_content_id: normalizedBase
    });
    const exists = (rootListing?.children || []).some(
      child => child.media_class === "directory" && String(child.title || "").replace(/\/$/, "") === folderName
    );

    if (exists) return targetDir;
  } catch {
    // Proceed to mkdir_service or direct check below if root browse fails.
  }

  if (!mkdirService || !mkdirService.includes(".")) {
    const error = new Error(`目标日期目录「${folderName}」不存在，且未配置 upload.mkdir_service。请先在 HA 配置 shell_command，或点击下方「上传到根目录」。`);

    error.canFallbackToRoot = true;
    throw error;
  }

  const [domain, service] = mkdirService.split(".", 2);

  try {
    await hass.callService(domain, service, { folder: folderName });
    return targetDir;
  } catch (err) {
    const error = new Error(`创建目录「${folderName}」失败（${err?.message || "未知错误"}），可检查 shell_command 配置或改用根目录上传。`);

    error.canFallbackToRoot = true;
    throw error;
  }
}

/**
 * Check target directory via browse_media and avoid overwriting existing files on disk.
 */
export async function resolveUniqueFileName(hass, mediaContentId, desiredFileName) {
  try {
    const listing = await hass.callWS({
      type: "media_source/browse_media",
      media_content_id: mediaContentId
    });
    const existing = new Set(
      (listing?.children || [])
        .filter(child => child.media_class !== "directory")
        .map(child => String(child.title || "").toLowerCase())
    );

    if (!existing.has(desiredFileName.toLowerCase())) return desiredFileName;

    const dotIndex = desiredFileName.lastIndexOf(".");
    const base = dotIndex > 0 ? desiredFileName.slice(0, dotIndex) : desiredFileName;
    const ext = dotIndex > 0 ? desiredFileName.slice(dotIndex) : "";
    let seq = 1;
    let candidate = `${base}_${seq}${ext}`;

    while (existing.has(candidate.toLowerCase())) {
      seq++;
      candidate = `${base}_${seq}${ext}`;
    }
    return candidate;
  } catch {
    return desiredFileName;
  }
}

/**
 * Upload a single file to Home Assistant local media_source using XHR with progress and token refresh.
 */
export async function uploadFileToHA({ hass, file, targetFileName, mediaContentId, onProgress, registerXhr }) {
  if (hass?.auth?.expired && typeof hass.auth.refreshAccessToken === "function") {
    await hass.auth.refreshAccessToken();
  }

  const token = hass?.auth?.data?.access_token;

  if (!token) {
    throw new Error("未获取到有效的 Home Assistant 登录凭据，请刷新页面重试。");
  }

  const renamedFile = new File([file], targetFileName, { type: file.type || "application/octet-stream" });
  const formData = new FormData();

  formData.append("media_content_id", mediaContentId);
  formData.append("file", renamedFile);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (registerXhr) registerXhr(xhr);
    xhr.open("POST", "/api/media_source/local_source/upload", true);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);

    xhr.upload.onprogress = event => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
        return;
      }
      if (xhr.status === 413) {
        reject(new Error("文件体积超出限制（HTTP 413）：Home Assistant 本地上传上限（20 MiB）或反向代理（Nginx client_max_body_size / Caddy request_body max_size）限制了上传大小。"));
        return;
      }

      let detail = xhr.statusText || `HTTP ${xhr.status}`;

      try {
        const parsed = JSON.parse(xhr.responseText);

        if (parsed?.message) detail = parsed.message;
      } catch {
        // Keep HTTP status text when response body is not JSON.
      }
      reject(new Error(`上传失败（HTTP ${xhr.status}）：${detail}`));
    };

    xhr.onerror = () => reject(new Error("网络异常，上传中断，请检查连接后重试。"));
    xhr.onabort = () => reject(new Error("UPLOAD_ABORTED"));
    xhr.send(formData);
  });
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Render the upload <dialog> inside the card's Shadow DOM.
 */
export function renderUploadDialog(card) {
  const state = card._uploadState;
  const uploadConfig = card.config?.upload || {};
  const previews = state.open ? computeQueuePreview(state.items, uploadConfig) : [];
  const accept = uploadConfig.accept || "video/*,image/*";
  const maxDate = dayjs().format("YYYY-MM-DD");

  return html`
    <dialog class="upload-dialog" @close="${card._handleUploadDialogClosed}" @cancel="${card._handleUploadDialogCancel}">
      ${state.open ? html`
        <div class="dialog-header">
          <div class="dialog-title">
            <ha-icon icon="mdi:cloud-upload-outline"></ha-icon>
            <span>补传漏录视频 / 图片</span>
          </div>
          <button type="button" class="icon-button" @click="${card._closeUploadDialog}" ?disabled=${state.uploading} aria-label="关闭" title="关闭">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>

        <div class="dialog-body">
          <div class="dropzone ${state.dragOver ? "drag-over" : ""}"
            @click="${() => card.shadowRoot?.querySelector(".upload-file-input")?.click()}"
            @dragover="${card._handleUploadDragOver}"
            @dragleave="${card._handleUploadDragLeave}"
            @drop="${card._handleUploadDrop}">
            <ha-icon icon="mdi:file-video-outline"></ha-icon>
            <div class="dropzone-text">点击选择或拖拽视频 / 图片到此处</div>
            <div class="dropzone-hint">支持批量选择，自动按规则命名并检测同名冲突</div>
            <input type="file" class="upload-file-input" multiple accept="${accept}" @change="${card._handleUploadFileSelect}" hidden>
          </div>

          ${previews.length > 0 ? html`
            <div class="upload-queue">
              ${previews.map((item, idx) => html`
                <div class="upload-item">
                  <div class="upload-item-head">
                    <ha-icon icon="${item.file.type?.startsWith("image/") ? "mdi:image-outline" : "mdi:video-outline"}"></ha-icon>
                    <span class="upload-item-name" title="${item.file.name}">${item.file.name}</span>
                    <span class="upload-item-size">${formatFileSize(item.file.size)}</span>
                    ${!state.uploading ? html`
                      <button type="button" class="icon-button small" @click="${() => card._removeUploadItem(idx)}" aria-label="移除" title="移除">
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    ` : html``}
                  </div>
                  <div class="upload-item-fields">
                    <label class="field-group">
                      <span>日期</span>
                      <input type="date" max="${maxDate}" .value="${item.dateStr}" ?disabled=${state.uploading}
                        @change="${e => card._updateUploadItem(idx, { dateStr: e.target.value })}">
                    </label>
                    <label class="field-group">
                      <span>时间</span>
                      <input type="time" step="1" .value="${item.timeStr}" ?disabled=${state.uploading}
                        @change="${e => card._updateUploadItem(idx, { timeStr: e.target.value })}">
                    </label>
                    <label class="field-group field-note">
                      <span>备注（选填）</span>
                      <input type="text" placeholder="如：快递" maxlength="24" .value="${item.note}" ?disabled=${state.uploading}
                        @input="${e => card._updateUploadItem(idx, { note: e.target.value })}">
                    </label>
                  </div>
                  <div class="upload-item-preview">
                    <ha-icon icon="mdi:folder-arrow-right-outline"></ha-icon>
                    <span>${state.forceRoot ? item.displayPath.replace(` / ${item.folderName} / `, " / ") : item.displayPath}</span>
                  </div>
                </div>
              `)}
            </div>
          ` : html``}

          ${state.uploading ? html`
            <div class="upload-progress-box">
              <div class="upload-progress-label">正在上传 (${state.completedCount + 1}/${previews.length})：${state.currentProgress}%</div>
              <div class="upload-progress-track">
                <div class="upload-progress-fill" style="width: ${state.currentProgress}%"></div>
              </div>
            </div>
          ` : html``}

          ${state.error ? html`
            <div class="upload-error" role="alert">
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <div class="upload-error-content">
                <div>${state.error}</div>
                ${state.canFallbackToRoot && !state.forceRoot ? html`
                  <button type="button" class="btn-secondary small" @click="${card._retryUploadToRoot}">改用根目录上传</button>
                ` : html``}
              </div>
            </div>
          ` : html``}
        </div>

        <div class="dialog-footer">
          ${state.uploading ? html`
            <button type="button" class="btn-secondary" @click="${card._cancelActiveUpload}">取消上传</button>
          ` : html`
            <button type="button" class="btn-secondary" @click="${card._closeUploadDialog}">取消</button>
            <button type="button" class="btn-primary" ?disabled=${previews.length === 0} @click="${card._startUpload}">
              开始上传${previews.length > 0 ? ` (${previews.length})` : ""}
            </button>
          `}
        </div>
      ` : html``}
    </dialog>
  `;
}
