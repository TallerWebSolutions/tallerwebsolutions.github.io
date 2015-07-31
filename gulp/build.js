
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
 * Copy font files.
 */
gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest(tmpDir('fonts')));
});

/**
 * Copy image files.
 */
gulp.task('images', function () {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest(tmpDir('images')));
});

/**
 * Compile Sass.
 */
gulp.task('sass', function () {
  return gulp.src('./src/sass/main.sass')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(tmpDir('css')));
});

/**
 * Creates main index.
 */
gulp.task('index', ['sass'], function () {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(tmpDir()));
});

/**
 * Creates main index.
 */
gulp.task('i18n', ['index'], function () {

});

gulp.task('build', ['sass', 'index', 'i18n', 'fonts', 'images']);
