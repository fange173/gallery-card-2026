# Gallery Card 2026

Modern Gallery Card for Home Assistant's UI LoveLace. Displays images and videos in a beautiful gallery style with performance optimizations and date search.

![Screenshot](https://github.com/fange173/gallery-card-2026/raw/master/screenshot.png)

## Features
- **Modern UI**: Clean design with smooth animations and responsive layout.
- **Performance**: Lazy loading for large file lists.
- **Date Search**: Easily find recordings from specific dates.
- **Auto Fallback**: Automatically find the latest recordings if none exist for today.

## Installation
1. Search for `Gallery Card 2026` in HACS or add this repository as a custom repository.
2. Add the card to your Lovelace dashboard.

## Configuration Example
```yaml
type: custom:gallery-card
title: Doorbell 
entities: 
  - path: media-source://media_source/local 
    recursive: true 
menu_alignment: Right  # Options: Right, Left, Bottom, Top, Hidden
maximum_files: 0       # 0 for unlimited
items_per_page: 10     # Number of items to show before "Load More"
file_name_format: "%YYY%m%d%H%M%S" 
caption_format: "%m/%d %H:%M" 
show_reload: true 
enable_date_search: true 
search_date_folder_format: YYYYMMDD
```

## Options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| entities | list | **Required** | List of entities or media-source paths. |
| title | string | Optional | Card title (hidden by default in 2026 version). |
| menu_alignment | string | Responsive | Layout of the thumbnails. |
| maximum_files | integer | 0 | Max number of files to retrieve (0 for unlimited). |
| items_per_page | integer | 10 | Initial number of thumbnails to show. |
| file_name_format | string | Optional | Format for parsing dates from filenames. |
| caption_format | string | Optional | Format for displaying captions. |
| show_reload | boolean | false | Show reload button. |
| enable_date_search | boolean | false | Enable date filtering. |
| search_date_folder_format | string | YYYYMMDD | Folder format for date search. |

## Credits
Based on the original [Gallery Card](https://github.com/lukelalo/gallery-card).
