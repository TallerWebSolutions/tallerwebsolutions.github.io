
var Q = require('q')
  , gulp = require('gulp')
  , sass = require('gulp-sass')
  , gutil = require('gulp-util')
  , buffer = require('vinyl-buffer')
  , ignore = require('gulp-ignore')
  , inject = require('gulp-inject')
  , rimraf = require('rimraf')
  , source = require('vinyl-source-stream')
  , sequence = require('run-sequence')
  , browserify = require('browserify')
  , autoprefixer = require('gulp-autoprefixer')

  , dir = function (base) { return function (path) { return (base || './') + (path ? '/' + path : ''); } }

  , srcDirBase = 'src'
  , srcDir = dir(srcDirBase)
  , distDirBase = 'dist'
  , distDir = dir(distDirBase)
  , tmpDirBase = '.tmp'
  , tmpDir = dir(tmpDirBase);

/**
 * Make a copy of a file/glob to destiny.
 */
function copy(from, to) {
  return gulp.src(from).pipe(gulp.dest(to));
}

/**
 * Helper method to remove path.
 */
function remove(path) {
  return Q.nfcall(rimraf, path).then(function () {
    gutil.log('Removing', gutil.colors.cyan('\'' + path + '\''));
  });
}

/**
 * Clean-up task.
 * @todo : should also remove & checkout dist.
 */
gulp.task('clean', function (done) {
  remove(tmpDir()).then(done);
});

gulp.task('clean:structure', function (done) {
  remove(tmpDir('structure/**/*')).then(done);
});

/**
 * Static non-processable assets.
 */
gulp.task('fonts', copy.bind(null, './src/fonts/**/*', tmpDir('fonts')));
gulp.task('images', copy.bind(null, './src/images/**/*', tmpDir('images')));

/**
 * Sass compiler generator.
 */
function sassCompile(entryPoint) {
  return function () {
    return gulp.src(entryPoint)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(tmpDir('css')));
  };
}

/**
 * Compile Sass.
 */
gulp.task('sass', sassCompile('./src/sass/main.sass'));
gulp.task('sass:structure', sassCompile('./src/sass/structure.scss'))

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
