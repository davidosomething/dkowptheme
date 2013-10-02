# Bare WordPress Theme

> A WordPress theme structure with Grunt build and release
> Includes [dkowpsnippets](https://github.com/davidosomething/dkowpsnippets) in
> `lib/snippets` as a [git subtree](https://blogs.atlassian.com/2013/05/alternatives-to-git-submodule-git-subtree/).

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

### Directories

* `build/` and `release/`
> Don't edit these folders manually. Their contents are generated from source
> via `grunt build` and `grunt release` respectively. They are not kept under
> version control.

* `source/assets/`
> Theme related images, fonts, JS, SASS/SCSS

* `source/assets/js/components/`
> External JS libraries installed through bower. Don't put stuff in here
> manually.

* `source/assets/js/vendor/`
> External JS libraries not installed through bower. Put stuff in here manually.

* `source/assets/sass/`
> Your SASS/SCSS files go ahead and edit

* `source/assets/sass/partials/`
> Your reusable SASS/SCSS files

* `source/assets/sass/vendor/`
> External SASS/SCSS modules (e.g. rstacruz/sass_icon_fonts, grid frameworks)

### Editing
* Edit templates (PHP) as usual.
* Only edit JS and SCSS files in `source/`.
  * `source/templates/` is for Handlebars templates
* `build/` is generated and used for development previewing
* `release/` is generated, optimized for web (minified, uglified, image-optimized)

### Grunt
* Use `grunt` to compile for dev and watch for JS/SASS changes.
* Use `grunt build` to just compile for dev.
* Use `grunt clean` to purge all files from the build/ and release/ folder.
* Use `grunt release` to build a release for prod into the release folder.
* Use `grunt watch` to watch the directory for changes and compile the dev build
  automatically. Watch also periodically lints JS and CSS as you're working.

### Theme installation
The compiled theme in the release folder is what you should ideally use since
the assets are minified, uglified, and cachebusted; but the source theme should
work as well. Using cachebusted assets will take some configuration. See the
helper functions in `lib/classes/DKOWPT/DKOWPT.php`

