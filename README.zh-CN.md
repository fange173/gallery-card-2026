# Gallery Card 2026

[English](README.md) | [中文](README.zh-CN.md)

用于 Home Assistant Lovelace 的自定义卡片，可浏览来自媒体源、文件列表传感器和相机实体的图片与视频。

本项目基于已有 Gallery Card fork 后适配，当前重点是画廊式布局、日期筛选、缩略图懒加载、加载状态和移动端导航体验。

## 预览

![Gallery Card 2026 预览图](docs/preview.png)

## 当前功能

- 大图/视频预览区，缩略图列表可显示在右侧、左侧、顶部、底部，也可隐藏或使用响应式布局。
- 支持图片、视频、Home Assistant 相机实体、`media-source://` 路径和文件列表传感器属性。
- 预览区和缩略图列表都有加载中与空状态。
- 缩略图懒加载，仅解析当前可见页面所需的媒体 URL。
- 支持日期筛选，可配合文件夹或文件名日期解析。
- 支持触摸滑动、键盘方向键导航，移动端会显示上一张/下一张按钮。
- 列表工具栏支持显示标题和手动刷新按钮。
- 支持可选幻灯片播放和视频播放设置。
- 会清理键盘监听、懒加载观察器、幻灯片定时器和临时媒体 URL 缓存。

## 安装

构建产物是项目根目录下的 `gallery-card.js`。将该文件放到 Home Assistant 可访问的位置，例如：

```text
/config/www/community/gallery-card/gallery-card.js
```

然后添加 Lovelace 资源：

```yaml
url: /local/community/gallery-card/gallery-card.js
type: module
```

卡片配置示例：

```yaml
type: custom:gallery-card
title: 门锁
entities:
  - path: media-source://media_source/local
    recursive: true
menu_alignment: right
items_per_page: 12
maximum_files: 100
enable_date_search: true
search_date_folder_format: YYYYMMDD
file_name_format: YYYYMMDDHHmmss
caption_format: MM/DD HH:mm
show_reload: true
```

## 本地开发

安装依赖：

```bash
npm ci --cache /tmp/gallery-card-2026-npm-cache
```

构建一次：

```bash
npm run build
```

监听源码变化：

```bash
npm run watch
```

开发时，将根目录生成的 `gallery-card.js` 复制到 Home Assistant 资源路径，然后强制刷新仪表盘页面。

## 配置

### 必填来源

使用 `entity` 或 `entities` 二选一。

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `entity` | string | 无 | 单个来源，内部会转换成 `entities`。 |
| `entities` | list | 无 | 实体 ID 或媒体源对象列表。 |

来源可以是字符串：

```yaml
entities:
  - sensor.front_door_files
```

也可以是媒体源对象：

```yaml
entities:
  - path: media-source://media_source/local/camera
    recursive: true
    include_images: true
    include_video: true
```

媒体源对象支持字段：

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `path` | string | 必填 | 媒体源路径。 |
| `recursive` | boolean | `false` | 是否浏览子目录。 |
| `include_images` | boolean | `true` | 是否包含图片媒体类型。 |
| `include_video` | boolean | `true` | 是否包含视频媒体类型。 |
| `folder_format` | string | 卡片配置值 | 覆盖卡片级文件夹格式。 |
| `file_name_format` | string | 卡片配置值 | 覆盖卡片级文件名日期格式。 |
| `file_name_date_begins` | number/string | 卡片配置值 | 从文件名第几个字符开始解析日期，按 1 开始计数。 |
| `caption_format` | string | 卡片配置值 | 覆盖卡片级标题格式。 |

### 布局

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | string | 无 | 在列表工具栏中显示紧凑标题。 |
| `menu_alignment` | string | `responsive` | 可选 `responsive`、`right`、`left`、`bottom`、`top`、`hidden`。 |
| `items_per_page` | number | `10` | 初始缩略图数量，也是点击“更多”时每次增加的数量。 |
| `show_reload` | boolean | `false` | 在列表工具栏中显示手动刷新按钮。 |

### 数量限制与排序

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `maximum_files` | number | 不限制 | `0` 表示不限制。 |
| `maximum_files_per_entity` | boolean | `true` | 是否按每个来源分别应用 `maximum_files`，否则按总数限制。 |
| `reverse_sort` | boolean | `true` | 按文件名或媒体标题排序后反转顺序。 |
| `random_sort` | boolean | `false` | 加载后随机打乱资源。 |
| `parsed_date_sort` | boolean | `false` | 按 `file_name_format` 解析出的日期排序。 |

### 日期与标题解析

旧的 strftime 风格 token，例如 `%Y`、`%m`、`%d`、`%H`、`%M`、`%S`，会在内部转换为 Day.js 风格 token。

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `enable_date_search` | boolean | `false` | 显示日期选择器，并按所选日期筛选。 |
| `search_date_folder_format` | string | `DD_MM_YYYY` | 递归筛选日期文件夹时使用的文件夹名称格式。 |
| `folder_format` | string | 无 | 与 `maximum_files` 和倒序排序配合时，可启用最近文件夹定向搜索。 |
| `file_name_format` | string | 无 | 用于从文件名解析日期的格式。 |
| `file_name_date_begins` | number/string | 无 | 从文件名第几个字符开始解析日期，按 1 开始计数。 |
| `caption_format` | string | 文件名 | 标题显示格式。使用 `AGO` 显示相对时间；使用单个空格隐藏文件名标题。 |

### 视频与幻灯片

| 名称 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `video_loop` | boolean | `false` | 主预览视频是否循环播放。 |
| `video_autoplay` | boolean | `false` | 主预览视频是否自动播放。 |
| `video_muted` | boolean | `false` | 视频元数据加载后是否静音。 |
| `video_preload` | boolean | `true` | 缩略图中是否预加载视频 metadata。 |
| `preview_video_at` | number | `0.1` | 视频缩略图 metadata 使用的时间点。 |
| `show_duration` | boolean | `true` | 保留视频时长处理逻辑，适用于存在时长标记的场景。 |
| `slideshow_timer` | number/string | 无 | 自动切换预览的秒数间隔。 |
| `slideshow_video_end` | boolean | `false` | 视频播放结束后是否自动切换到下一项。 |

## 说明

- `media-source://` 条目需要解析 `resolve_media` URL。卡片会优先解析当前可见首屏，之后仅在更多条目变为可见或被选中时继续解析。
- 临时媒体 URL 的缓存时间短于 Home Assistant resolve 过期窗口。
- 文件列表传感器需要提供 `fileList` 或 `file_list` 属性。
- 根目录的 `gallery-card.js` 由 `src/gallery-card.js` 构建生成。

## Credits

本项目 fork 自 [lukelalo/gallery-card](https://github.com/lukelalo/gallery-card)，其上游 fork 自 [TarheelGrad1998/gallery-card](https://github.com/TarheelGrad1998/gallery-card)。当前仓库保留原 MIT License，并基于本项目的 Home Assistant 使用场景做适配。
