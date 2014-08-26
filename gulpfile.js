var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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

gulp.task('browserify', function(){
	return browserify('./src/js/all.js')
	.bundle()
	//Pass desired output filename to vinyl-source-stream
	.pipe(source('all.js'))
	.pipe(gulp.dest('./build/js/'));
});

gulp.task('uglify', function(){
	gulp.src('build/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

gulp.task('build', ['browserify', 'uglify','sass']);

gulp.task('watch', function(){
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/js/*.js', ['browserify']);
});


