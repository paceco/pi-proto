# PI Boot Prototyping

PI Boot + Basic HTML imports + LiveReload

### To install:

Install node

    brew install node

Install gulp (only if you have node, but not gulp):

    npm install --global gulp

Install gulp and all its dependencies into the project (pulls from package.json):

    npm install

Then run gulp as normal:

    gulp [task name here]

Boom. A static webserver will now show at:

    http://localhost:4000
    or
    http://0.0.0.0:4000
    or
    http://127.0.0.1:4000

(pick your poison, or find which one works if your `hosts` file is mangled).

### Current Tasks:

|Task Name|Description|
|:--------|:----------|
|default (no argument) | Builds all sass and js, then kicks off `watch` process |
| sass | compiles sass and autoprefixes for browser support |
| sass-build | compiles sass, autoprefixes, and minifies |
| include | stitches everything together from `assets/src/templates` with html includes |
| server | fires up a local webserver at port 4000 |
| concat | concatenates all js |
| watch  | watches for changes in sass, js, or html templates, then recompiles/concatenates |
| build | outputs compressed and minified versions of sass and js, used for push hook |


### Differences from pi-boot

The file structure matches pi-boot very closely with the idea that the prototype can be cleaned up and rolled into a production project to keep moving. It uses all the same core css and js processing and tasks as our production projects.

### Migrating to production

When a prototype is ready to be ported, the `asset` folder can be picked up and moved directly into a pi-boot implemenation. Leave behind the `gulpfile.js` (it has extra functions for the static server) and remove the `assets/src/templates` folder.

Easy peasy, right?

### Extra Credit: LiveReload

For extra funcionality, download the [LiveReload extension for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en-US) or [for Firefox and other Browsers](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

Once you have the extension, run gulp and load `http://localhost:4000`, then turn the extension on. It will then detect any changes and reload the browser automatically when it detects anything in the `assets/build` folder has been updated.
