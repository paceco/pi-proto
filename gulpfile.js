var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass', function () {
	return gulp.src('sass/main.scss')
	.pipe(sass({
		style: 'compressed',
		sourcemap: true,
		sourcemapPath: '../sass'
	}))
	.pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
	gulp.watch('sass/*.scss', ['sass']);
});


