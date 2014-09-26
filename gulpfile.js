var gulp       = require('gulp');
var concat     = require('gulp-concat');
var sass       = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify     = require('gulp-uglify');
var notify     = require('gulp-notify');
var changed    = require('gulp-changed');
var express    = require('express');

// for prototyping
var fileinclude = require('gulp-file-include');
// var webserver = require('gulp-webserver');
var livereload = require('gulp-livereload');


// Compiles sass and autoprefixes
gulp.task('sass', function () {
	return gulp.src('source/sass/main.scss')
	.pipe(sass({
		style: 'expanded',
		// sourcemap: true,
		sourcemapPath: '..source/sass'
	}))
	// Prevent sass from stopping on errors
	.on('error', handleErrors)
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('build/css'));
});

// Concatenates all js
gulp.task('concat', function(){
	gulp.src([
		// Load bootstrap js in order
		'./source/js/plugins/bootstrap/transition.js',
		'./source/js/plugins/bootstrap/alert.js',
		'./source/js/plugins/bootstrap/button.js',
		'./source/js/plugins/bootstrap/carousel.js',
		'./source/js/plugins/bootstrap/collapse.js',
		'./source/js/plugins/bootstrap/dropdown.js',
		'./source/js/plugins/bootstrap/modal.js',
		'./source/js/plugins/bootstrap/tooltip.js',
		'./source/js/plugins/bootstrap/popover.js',
		'./source/js/plugins/bootstrap/scrollspy.js',
		'./source/js/plugins/bootstrap/tab.js',
		'./source/js/plugins/bootstrap/affix.js',
		// Any other plugins?
		'./source/js/plugins/*.js',
		// Load custom js
		'./source/js/main.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./build/js/'));
});

// Minify js
gulp.task('uglify', function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// File includes
gulp.task('include', function(){
	gulp.src('./source/templates/*.html')
	.pipe(fileinclude())
	.on('error', handleErrors)
	.pipe(gulp.dest('./build'))
	.pipe(livereload());
});

// Simple local webserver
gulp.task('server', function(){
	var app = express();
	app.use(express.static('build'));
	app.listen(4000);
});

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass','include', 'static'], function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// Move static files only if there are changes
gulp.task('static', function(){
	return gulp.src('source/static/**/*')
	.pipe(changed('build'))
	// extra pipes can go here if needed
	.pipe(gulp.dest('build'));
});

// Watch for changes, recompile, and kick livereload
gulp.task('watch', ['server'], function(){
	gulp.watch('source/sass/**/*.scss', ['sass']);
	gulp.watch('source/js/**/*.js', ['concat']);
	gulp.watch('source/templates/**/*', ['include']);
	gulp.watch('source/static/**/*', ['static']);

	livereload.listen();
	gulp.watch('build/**').on('change', livereload.changed);
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
