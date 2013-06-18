# DKO WordPress Theme Framework

## Requirements
* node.js
    * npm
    > run `npm install` to install local npm dependencies like grunt
        * (optional) bower
        > install the bower npm package globally to use it for managing JS

The npm dependencies are listed in `package.json`

## How to use
* Copy this entire repo into a folder in your WordPress themes folder, edit
files in the source folder (see the Directories breakdown below for where to
start).
    * The `get_stylesheet_directory()` path will be something like
      `/content/themes/dkowptheme/release`

### Grunt
* Use `grunt` to compile for dev and watch for JS/SASS changes.
* Use `grunt dev` to just compile for dev.
* Use `grunt clean` to purge all files from the release folder.
* Use `grunt release` to build a release for prod into the release folder.
* Use `grunt watch` to watch the directory for changes and compile the dev build
  automatically

### Theme activation
The compiled theme in the release folder is what you should ideally use since
the assets are minified, uglified, and cachebusted; but the source theme should
work as well. Using cachebusted assets will take some configuration.

## Directories

* release/
> Don't edit this folder manually. Its contents are generated from source via
> `grunt release`

* source/assets/img/
> Theme related images

* source/assets/js/
> Your JS for the theme

* source/assets/js/components/
> External JS libraries installed through bower. Don't put stuff in here
> manually

* source/assets/js/vendor/
> External JS libraries not installed through Bower. Put stuff in here manually.

* source/assets/sass/
> Your SASS/SCSS files

* source/assets/sass/partials/
> Your reusable SASS/SCSS files

* source/assets/sass/vendor/
> External SASS/SCSS modules (e.g. rstacruz/sass_icon_fonts, grid frameworks)

