var gulp       = require('gulp');
var concat     = require('gulp-concat');
var libsass    = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var changed    = require('gulp-changed');

// included for prototyping
var fileinclude = require('gulp-file-include');
var livereload  = require('gulp-livereload');
var express     = require('express');


// Asset Handling - SCSS and JS
// --------------------------------------------------------------------------- 

// Compile top-level sass and autoprefix that jounce
gulp.task('sass', function () {
	return gulp.src('assets/source/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'nested', // only supports nested or compressed
		sourceComments: 'normal'
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Compile top-level sass and compress it like whoa
gulp.task('sass-build', function () {
	return gulp.src('assets/source/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'compressed', // only supports nested or compressed
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Top level task to compile both third-party and custom JS
gulp.task('concat', ['vendor-concat', 'js-concat']);

// Concatenates third-party js
gulp.task('vendor-concat', function(){
	return gulp.src([
		// Load bootstrap js in order
		'./assets/source/vendor/bootstrap/js/transition.js',
		'./assets/source/vendor/bootstrap/js/alert.js',
		'./assets/source/vendor/bootstrap/js/button.js',
		'./assets/source/vendor/bootstrap/js/carousel.js',
		'./assets/source/vendor/bootstrap/js/collapse.js',
		'./assets/source/vendor/bootstrap/js/dropdown.js',
		'./assets/source/vendor/bootstrap/js/modal.js',
		'./assets/source/vendor/bootstrap/js/tooltip.js',
		'./assets/source/vendor/bootstrap/js/popover.js',
		'./assets/source/vendor/bootstrap/js/scrollspy.js',
		'./assets/source/vendor/bootstrap/js/tab.js',
		'./assets/source/vendor/bootstrap/js/affix.js',

		// Other plugins. Load more here as necessary
		'./assets/source/vendor/flickity/flickity.pkgd.min.js',
		'./assets/source/vendor/packery.pkgd.min.js',

		// Turn on wildcard selector? Grabs any js file in source/vender
		// './assets/source/vendor/*.js',
	])
	.pipe(concat('vendor.js'))
	.pipe(gulp.dest('./assets/build/js/'));
});

// Concatenates all custom js
gulp.task('js-concat', function(){
    return gulp.src([
        './assets/source/js/main.js',
		// Any others? Load here as necessary
        // './assets/source/js/*.js',
    ])
    .pipe(concat('custom.js'))
    .pipe(gulp.dest('./assets/build/js'));    
});


// Static Assets
// ---------------------------------------------------------------------------

// Move static files only if there are changes
gulp.task('static', ['vendor-fonts'], function(){
	return gulp.src('assets/static/**/*')
	.pipe(changed('assets/build'))
	// extra pipes can go here if needed, ie image compression
	.pipe(gulp.dest('assets/build'));
});

// Move fonts not in static folder
gulp.task('vendor-fonts', function(){
	return gulp.src([
		'./assets/source/vendor/bootstrap/fonts/*',
		// Place any other vendor fonts here:
		// './assets/source/vendor/...',
	])
	.pipe(changed('assets/build/fonts'))
	.pipe(gulp.dest('assets/build/fonts'));
});

// Prototyping Functions
// ---------------------------------------------------------------------------

// File includes
gulp.task('include', function(){
	gulp.src('./assets/source/templates/*.html')
	.pipe(fileinclude())
	.on('error', handleErrors)
	.pipe(gulp.dest('./assets/build'))
	.pipe(livereload());
});

// Simple local webserver, using Express because gulp-webserver barfs
gulp.task('server', function(){
	// setup server
	var app = express();
	app.use(express.static('assets/build'));
	app.listen(4000);
	// print message
	console.log("Server listening at http://0.0.0.0:4000.");
});


// Watch and Build Functions
// ---------------------------------------------------------------------------

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass-build','include','static'], function(){
	gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Watch for changes, recompile, and kick livereload
gulp.task('watch', ['server'], function(){
	gulp.watch('assets/source/sass/**/*.scss', ['sass']);
	gulp.watch('assets/source/js/**/*.js', ['concat']);
	gulp.watch('assets/static/**/*', ['static']);
	gulp.watch('assets/source/templates/**/*', ['include']);
	
	// tell livereload something has changed
	livereload.listen();
	gulp.watch('assets/build/**').on('change', livereload.changed);
});

// Default Task
// Build everything and kick off the watch
// ---------------------------------------------------------------------------

gulp.task('default', ['concat', 'sass', 'include', 'static', 'watch']);

// Error Handling
// ---------------------------------------------------------------------------

function handleErrors(){
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}
