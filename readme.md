# PI Boot + Gulp

Test build using Gulp as a front-end layer.

### To install:

Install gulp (assuming you have node, but not gulp):

    npm install --global gulp

Install gulp into the project, and all it's dependencies (pulls from package.json):

    npm install

Then run gulp as normal:

    gulp [task name here]

### Current Tasks:

- sass (compiles sass and autoprefixes for browser support)
- concat (concatenates js)
- watch (watches src/js/\*js and src/scss/\*scss for changes and then builds
- uglify (compress js)
- build

### To Do:

- build process fix
- other front-end tools?
