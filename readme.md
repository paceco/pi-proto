# PI Boot Prototyping

PI Boot + Basic HTML imports + LiveReload

This is an addition to the basic [pi-boot](https://github.com/paceco/pi-boot)
structure to allow for rapid prototyping separate from any development
environment.

It's most useful for:

- Quickly spinning up the front-end dependencies of a project while the
	traditional environment is being set up.
- Quick exploration of a concept with the intention of porting it back into
	a Pace project.

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

- `/assets/build/...` 
	- contains all generated assets, sourcing should happen in this folder.
- `/assets/source/...` 
	- contains all source files for generated assets, all work should happen in
		this folder
- `/assets/static/...`
	- contains all non-processed assets (images, fonts, etc)--things you don't
		want smushed together.
	- this also is where critical js that must load in the head should be placed

The `source` folder, where all the work happens, is also split into three subfolders

- `/assets/source/js/...` 
	- all custom javascript.
- `/assets/source/sass/...` 
	- all custom SASS styles.
- `/assets/source/vendor/...` 
	- all third-party js, css, and sass.


### SASS Structure

We currently follow a loose interpretation of OOCSS (Object Oriented CSS) with
some structure cues from [DOCSSA](http://docssa.info/) and
[SMACSS](https://smacss.com/).

There are three hierarchical structures:

1. **Base**
	- Contains rules, variables, mixins used throughout the project
2. **Components**
	- Borrowed from DoCCSa, but much simpler in scope. These are intended to be
		reusable and extendable pieces of code that could be used in a completely
		different project. Basically these will be our 'solved' design patterns.
	- Typically, new rules should not go in here, only reusable patterns that have
		evolved fron the 'layouts' folder.
3. **Layouts**
	- This is the common working area for a project. All new rules go into
		'layouts' first.
	- These are organized by specific views first (homepage, article, etc) and as
		patterns emerge they will be separated into separate components to be used
		across different sections of the site.

For each section there is a double-underscore master file that collects the
imports for everything in it's grouping (all 'components' are sourced in
`__components.scss`).


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

----

### Migration to a Live Project

This kit is meant to be disposable and not intended for any production work.
Once the prototype has matured enough to be integrated into a live project a few
things have to happen.

1. Turn off the additional modules sourced in package.json:
	- gulp-file-include module
	- gulp-livereload module
	- express module
2. Revert gulpfile.js to match the standard [pi-boot](https://github.com/paceco/pi-boot)
3. Move the entire assets folder into the working level of the project, if
	 you're not sure where this is, ask a teammate.
4. The `assets/souce/template` folder can remain for reference purposes but
	 should ultimately be removed as markup is integrated into the proper
	 templates.
