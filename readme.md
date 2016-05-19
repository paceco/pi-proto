# PI Boot Prototyping

PI Boot + Basic HTML imports + LiveReload

### Dependencies:

- Node 4.2.1
- Gulp

**(For Node 0.12 and lower, replace the `package.json` with [the older version](https://gist.github.com/nathanlong/1bcd85a4511c25d49f15) to ensure compatibility.)**

### One-line install:

	bash -c "$(curl -fsSL raw.github.com/paceco/pi-proto/master/bin/standup.sh)"

This will ask you to name your prototype, then download all the files and node
modules for you.

### To install manually:

Either download or clone the project (make sure to disconnect the git remote if
you clone so you don't push up your prototype into this repo.)

Navigate to project and run:

    npm install

This will install the node packages. Then run gulp as normal:

    gulp [task name here]

If you run `gulp` without any tasks specified, it will run the default task.

### Current Tasks:

|Task Name|Description|
|:--------|:----------|
| default | Builds all sass and js, then kicks off `watch` process |
| sass | compiles sass and autoprefixes for browser support |
| sass-build | compiles sass, autoprefixes, and minifies |
| concat | fires off vendor-concat and  |
| vendor-concat | specifies a list of javascript files to load, preserves order |
| js-concat | specifies a list of custom javascript files to load, preserves order |
| static | moves all static assets to `assets/build` and updates them if there are changes |
| vendor-fonts | specifies a list of all vendor fonts to move to `assets/build/fonts`, this allows third-party files to stay together |
| build | outputs compressed and minified versions of sass and js, used for push hook |
| watch | will watch for any changes in custom files and regenerate on update |
| include | stitches all html includes together |
| server | fires up a local webserver at port 4000 |

### Basic Structure

All front-end assets are contained within the `/assets/` folder.

There are three subfolders:

- `/assets/build/` - contains all generated assets, sourcing should happen in this folder.
- `/assets/source/` - contains all source files for generated assets, all work should happen in this folder
- `/assets/static/` - contains all non-processed assets (images, fonts, etc)--things you don't want smushed together.

The `source` folder, where all the work happens, is also split into three subfolders

- `/assets/source/js` - all custom javascript.
- `/assets/source/sass` - all custom SASS styles.
- `/assets/source/vendor` - all third-party js, css, and sass.


### Installing new plugins

To install a new plugin into the project, download files and place them in `/assets/source/vendor/`.

**For js files:**

- Update the `vendor-concat` task in `gulpfile.js` to include the new plugin.

**For css/scss files:**

- Make sure they have the `.scss` file extension 
- Include in `/assets/source/vendor/__vendor.scss`

### Installing new fonts

There are two ways to introduce new fonts into the framework:

**Standalone:**

Place the font files in `/assets/static/fonts/`. The `static` task will copy these to `/assets/build/fonts/` and can be sourced from the css as `../fonts/fontname.otf`, etc

**Vendor:**

If the fonts are included in another package (like Bootstrap) you can leave them inside their package and source them in the `vendor-fonts` task in the `gulpfile.js`

This will grab all the fonts you specify and move them into the same location as the other fonts (`/assets/build/fonts`) for sourcing.

----

### Differences from pi-boot

The file structure matches pi-boot very closely with the idea that the prototype can be cleaned up and rolled into a production project to keep moving. It uses all the same core css and js processing and tasks as our production projects.

### Migrating to production

When a prototype is ready to be ported, the `asset` folder can be picked up and moved directly into a pi-boot implemenation. Leave behind the `gulpfile.js` (it has extra functions for the static server) and remove the `assets/src/templates` folder.

Easy peasy, right?

## HTML Templating

This toolkit uses the super simple [gulp-file-include](https://www.npmjs.com/package/gulp-file-include) to allow reuse of markup (remember DRY!).

To use add:

```html
@@include('partials/nav.html')
```

It will follow that path and expand it when `gulp` runs.

It's also possible to pass strings into the includes:

```html
@@include('partials/nav.html', {'nameOfVariable': 'nameOfAThing'})
```

Which you can use in your partial `nav.html`:

```html
<nav class="@@nameOfVariable">
  <!-- stuff -->
</nav>
```

And when `gulp` runs, it'll become:

```html
<nav class="nameOfAThing">
  <!-- stuff -->
</nav>
```

You can include as many variables as you'd like:

```html
@@include('partials/nav.html', {'nameOfVariable': 'nameOfAThing', 'anotherVariable': 'anotherThing'})
```

----

### Extra Credit: LiveReload

For extra funcionality, download the [LiveReload extension for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en-US) or [for Firefox and other Browsers](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

Once you have the extension, run gulp and load `http://localhost:4000`, then turn the extension on. It will then detect any changes and reload the browser automatically when it detects anything in the `assets/build` folder has been updated.
