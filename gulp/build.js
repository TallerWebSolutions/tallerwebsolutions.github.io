
var gulp = require('gulp')
  , sass = require('gulp-sass')
  , gutil = require('gulp-util')
  , buffer = require('vinyl-buffer')
  , rimraf = require('rimraf')
  , source = require('vinyl-source-stream')
  , sequence = require('run-sequence')
  , browserify = require('browserify')
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
 * Bundle JavaScripts.
 */
gulp.task('scripts', function () {
  var browserified = browserify({
    entries: './src/js/main.js',
    debug: true
  });

  return browserified.bundle()
    .pipe(source('taller.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        // .pipe(uglify())
        // .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(tmpDir('js')));
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

/**
 * Build tmp directory.
 */
gulp.task('build:tmp', function (done) {
  sequence('clean', ['sass', 'index', 'i18n', 'fonts', 'images', 'scripts'], done);
});

/**
 * Main building task.
 */
gulp.task('build', ['build:tmp']);
