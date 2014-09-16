var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var notify = require("gulp-notify");

// Compiles sass and autoprefixes
gulp.task('sass', function () {
	return gulp.src('assets/src/sass/main.scss')
	.pipe(sass({
		style: 'expanded',
		// sourcemap: true,
		sourcemapPath: '..src/sass'
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

// Minify js
gulp.task('uglify', function(){
	gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Minify vendor scripts, but don't concatenate
gulp.task('vendor', function(){
	gulp.src('assets/src/js/vendor/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js/vendor'));
});

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass', 'vendor'], function(){
	gulp.src('assets/build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/js'));
});

// Watch for changes, recompile sass and js
gulp.task('watch', function(){
	gulp.watch('assets/src/sass/**/*.scss', ['sass']);
	gulp.watch('assets/src/js/**/*.js', ['concat']);
	gulp.watch('assets/src/js/**/*.js', ['vendor']);
});

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
