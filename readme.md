# PI Boot + Gulp

Front-end framework using Gulp to tie everything together.

### To install:

Install gulp (assuming you have node, but not gulp):

    npm install --global gulp

Install gulp into the project, and all it's dependencies (pulls from package.json):

    npm install

Install ruby dependencies (requires bundler gem):

    bundle install

Then run gulp as normal:

    gulp [task name here]

### Current Tasks:

- sass (compiles sass and autoprefixes for browser support)
- concat (concatenates js)
- watch (watches src/js/\*js and src/scss/\*scss for changes and then builds
- uglify (compress js)
- images (optimizes images)
- build
