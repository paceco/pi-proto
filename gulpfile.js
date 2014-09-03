var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var autoprefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');

// Compiles sass and autoprefixes
gulp.task('sass', function () {
	return gulp.src('src/sass/main.scss')
	.pipe(sass({
		style: 'expanded',
		sourcemap: true,
		sourcemapPath: '..src/sass'
	}))
	// Autoprefixer defaults to > 1%, last 2 versions, Firefox ESR, Opera 12.1 browser support
	.pipe(autoprefix())
	.pipe(gulp.dest('build/css'));
});

// Concatenates all js
gulp.task('concat', function(){
	gulp.src([
		// Load bootstrap js in order
		'./src/js/plugins/bootstrap/transition.js',
		'./src/js/plugins/bootstrap/alert.js',
		'./src/js/plugins/bootstrap/button.js',
		'./src/js/plugins/bootstrap/carousel.js',
		'./src/js/plugins/bootstrap/collapse.js',
		'./src/js/plugins/bootstrap/dropdown.js',
		'./src/js/plugins/bootstrap/modal.js',
		'./src/js/plugins/bootstrap/tooltip.js',
		'./src/js/plugins/bootstrap/popover.js',
		'./src/js/plugins/bootstrap/scrollspy.js',
		'./src/js/plugins/bootstrap/tab.js',
		'./src/js/plugins/bootstrap/affix.js',
		// Any other plugins?
		'./src/js/plugins/*.js',
		// Load custom js
		'./src/js/main.js'
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

// Minify vendor scripts, but don't concatenate
gulp.task('vendor', function(){
	gulp.src('src/js/vendor/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js/vendor'));
});

// Compiles sass and js, then minifies all js
gulp.task('build', ['concat','sass', 'vendor'], function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// Watch for changes, recompile sass and js
gulp.task('watch', function(){
	gulp.watch('src/sass/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['concat']);
	gulp.watch('src/js/**/*.js', ['vendor']);
});
