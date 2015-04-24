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


// Compile top-level sass and autoprefix that jounce
gulp.task('sass', function () {
	return gulp.src('assets/src/sass/*.scss')
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
	return gulp.src('assets/src/sass/*.scss')
	.pipe(libsass({
		outputStyle: 'compressed', // only supports nested or compressed
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('assets/build/css'));
});

// Concatenates all js
gulp.task('concat', function(){
	gulp.src([
		// Load bootstrap js in order
		'./assets/src/js/plugins/bootstrap/transition.js',
		'./assets/src/js/plugins/bootstrap/alert.js',
		'./assets/src/js/plugins/bootstrap/button.js',
		'./assets/src/js/plugins/bootstrap/carousel.js',
		'./assets/src/js/plugins/bootstrap/collapse.js',
		'./assets/src/js/plugins/bootstrap/dropdown.js',
		'./assets/src/js/plugins/bootstrap/modal.js',
		'./assets/src/js/plugins/bootstrap/tooltip.js',
		'./assets/src/js/plugins/bootstrap/popover.js',
		'./assets/src/js/plugins/bootstrap/scrollspy.js',
		'./assets/src/js/plugins/bootstrap/tab.js',
		'./assets/src/js/plugins/bootstrap/affix.js',
		// Any other plugins?
		'./assets/src/js/plugins/*.js',
		// Load custom js
		'./assets/src/js/main.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./assets/build/js/'));
});

// File includes
gulp.task('include', function(){
	gulp.src('./assets/src/templates/*.html')
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

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass-build','include', 'static'], function(){
	gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Move static files only if there are changes
gulp.task('static', function(){
	return gulp.src('assets/static/**/*')
	.pipe(changed('assets/build'))
	// extra pipes can go here if needed, ie image compression
	.pipe(gulp.dest('assets/build'));
});

// Watch for changes, recompile, and kick livereload
gulp.task('watch', ['server'], function(){
	gulp.watch('assets/src/sass/**/*.scss', ['sass']);
	gulp.watch('assets/src/js/**/*.js', ['concat']);
	gulp.watch('assets/static/**/*', ['static']);
	gulp.watch('assets/src/templates/**/*', ['include']);
	
	// tell livereload something has changed
	livereload.listen();
	gulp.watch('assets/build/**').on('change', livereload.changed);
});

// Build everything and kick off the watch
gulp.task('default', ['concat', 'sass', 'include', 'static', 'watch']);

// Error function
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
