
var gulp = require('gulp')
  , gutil = require('gulp-util')
  , sass = require('gulp-sass')
  , rimraf = require('rimraf')
  , autoprefixer = require('gulp-autoprefixer')

  , tmpDirBase = '.tmp'
  , tmpDir = function (dir) { return tmpDirBase + (dir ? '/' + dir : ''); };

/**
 * Clean-up task.
 * @todo : should also remove & checkout dist.
 */
gulp.task('clean', function (done) {
  rimraf(tmpDir(), function () {
    gutil.log('Removing', gutil.colors.cyan('\'' + tmpDir() + '\''));
    done();
  });
});

/**
 * Compile Sass.
 */
gulp.task('sass', function () {
  return gulp.src('./sass/main.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('build', ['sass']);
