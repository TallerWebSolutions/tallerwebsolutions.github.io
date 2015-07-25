
var gulp = require('gulp')
  , sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', ['sass']);
