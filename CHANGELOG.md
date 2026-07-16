## Unreleased

### Improvements

* Resolve media URLs only for visible or selected items instead of processing the full gallery in the background.
* Add compact title and reload controls, explicit loading/error states, and keyboard-accessible thumbnails.
* Improve card-width responsive layouts, mobile scrolling, thumbnail sizing, and reduced-motion support.
* Prevent cross-source configuration leakage, duplicate slideshow timers, and mutations of Home Assistant file-list attributes.

## [1.2.0](https://github.com/lukelalo/gallery-card/compare/v1.1.0...v1.2.0) (2024-04-14)


### Features

* On slideshows allow to wait for video finish instead of wait an amount of time ([6fd99d5](https://github.com/lukelalo/gallery-card/commit/6fd99d504acac3cb7edeeee30c44fea428336426))

## [1.1.0](https://github.com/lukelalo/gallery-card/compare/v1.0.2...v1.1.0) (2024-04-14)


### Features

* Try to validate with hacs validation ([58e1402](https://github.com/lukelalo/gallery-card/commit/58e1402c10fc7c15d80598fc5e4c72ecb1b48080))

## [1.0.2](https://github.com/lukelalo/gallery-card/compare/v1.0.1...v1.0.2) (2024-04-14)


### Bug Fixes

* Added placeholder.jpg as asset ([c49a3ce](https://github.com/lukelalo/gallery-card/commit/c49a3ce0ec9277b5e60f480ced01572a674b6e6a))
* isImageExtension wasn't matching right ([c36ff00](https://github.com/lukelalo/gallery-card/commit/c36ff00410d265fd65436cdd2478b491c6b97df4))

## [1.0.1](https://github.com/lukelalo/gallery-card/compare/v1.0.0...v1.0.1) (2024-04-14)


### Bug Fixes

* Media files not loading due to await removal ([21d04b7](https://github.com/lukelalo/gallery-card/commit/21d04b7bb0cff8caa95332eba29172bba0bf184d))


### Documentation

* Added badges ([c793223](https://github.com/lukelalo/gallery-card/commit/c79322334feaa8be1187decb8afeeb26d9612520))

## 1.0.0 (2024-04-13)


### Bug Fixes

* **pencil:** restored name to gallery-card instead of gallery-card-2024 to avoid change name in dashboards ([4898a9c](https://github.com/lukelalo/gallery-card/commit/4898a9cc69c4e96d8d867ea37772b6fd12080eb8))
