
var gulp = require('gulp')
  , connect = require('gulp-connect');

gulp.task('serve', function () {
  return connect.server({
    root: './',
    livereload: true,
    port: 8081
  });
});
