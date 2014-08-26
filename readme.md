# PI Boot + Gulp

Test build using Gulp as a front-end layer.

Currently only compiles SASS.

### To install:

Install gulp (assuming you have node installed):

    npm install --global gulp

Install gulp into the project, and all it's dependencies:

    npm install --save-dev browserify vinyl-source-stream gulp-ruby-sass gulp-uglify gulp

Then run grunt as normal:

    grunt [task name here]

### Current Tasks:

- sass (compiles sass)
- watch (watches src/js/\*js and src/scss/\*scss for changes and then builds
- uglify (compress js)
- build (WIP - runs all tasks async, this is a problem for js - needs reworked )

### To Do:

- build process fix
- polish install process

    

