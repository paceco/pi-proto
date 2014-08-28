var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
	return gulp.src('src/sass/main.scss')
	.pipe(sass({
		style: 'compressed',
		sourcemap: true,
		sourcemapPath: '..src/sass'
	}))
	.pipe(gulp.dest('build/css'));
});

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

gulp.task('uglify', function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

gulp.task('build', ['concat','sass'], function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

gulp.task('watch', function(){
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['browserify']);
});


