# PI Boot Prototyping

PI Boot + Basic imports + LiveReload

### To install:

Install gulp (assuming you have node, but not gulp):

    npm install --global gulp

Install gulp into the project, and all it's dependencies (pulls from package.json):

    npm install

Install ruby dependencies (requires bundler gem):

    bundle install

Then run the default gulp task:

    gulp

Boom. A static webserver will now show at:

    http://localhost:4000
    or
    http://0.0.0.0:4000

### Differences from pi-boot

Though we're using the same architecture, the folder structure has been changed slightly to allow Express to locally serve up the entire `build` folder, which means all the static assets have to come along for the ride.

Once prototyping is over, the sass and js will have to be integrated back into the standard pi-boot structure.

### LiveReload

For extra funcionality, download the [LiveReload extension for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en-US) or [for Firefox and other Browsers](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-).

Once you have the extension, run gulp and load `http://localhost:4000`, then turn the extension on. It will then detect any changes and reload the browser automatically.
