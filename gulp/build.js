
var Q = require('q')
  , fs = require('fs')
  , path = require('path')
  , gulp = require('gulp')
  , sass = require('gulp-sass')
  , async = require('async')
  , gutil = require('gulp-util')
  , buffer = require('vinyl-buffer')
  , extend = require('extend')
  , ignore = require('gulp-ignore')
  , inject = require('gulp-inject')
  , rimraf = require('rimraf')
  , source = require('vinyl-source-stream')
  , jsonfile = require('jsonfile')
  , sequence = require('run-sequence')
  , browserify = require('browserify')
  , handlebars = require('gulp-hb')
  , browserSync = require('browser-sync')
  , autoprefixer = require('gulp-autoprefixer')

  , absolutePath = path.join.bind(null, process.cwd())
  , dir = function (base) { return function (path) { return (base || './') + (path ? '/' + path : ''); } }

  , srcDirBase = absolutePath('src')
  , srcDir = dir(srcDirBase)
  , distDirBase = absolutePath('dist')
  , distDir = dir(distDirBase)
  , tmpDirBase = absolutePath('.tmp')
  , tmpDir = dir(tmpDirBase)

  , defaultLanguage = 'pt-br'
  , i18nDirBase = absolutePath('i18n')
  , i18nDir = dir(i18nDirBase)
  , i18nFiles = fs.readdirSync(i18nDirBase).filter(function (filename) {
      return filename.match(/\.json$/);
    })
  , translations = {}

  , wholeCopyIgnores = [tmpDir('structure')].map(function (source) {
      return '!' + source;
    });

/**
 * Helper method to load translations.
 */
function loadTranslations(done) {
  async.each(i18nFiles, function (filename, next) {
    jsonfile.readFile(i18nDir(filename), function (err, obj) {
      if (err) gutil.log('i18n error:', gutil.colors.red('"' + err + '"'));
      else translations[filename.slice(0, -5)] = obj;
      next();
    });
  }, done);
};

/**
 * Make a copy of a file/glob to destiny.
 */
function copy(from, to) {
  return gulp.src(from).pipe(gulp.dest(to));
}

/**
 * Helper to copy base structure.
 */
function copyBase(to) {
  return copy([tmpDir('**/*')].concat(wholeCopyIgnores), to);
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

gulp.task('clean:index', function (done) {
  remove(tmpDir('index.html')).then(done);
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
      .pipe(gulp.dest(tmpDir('css')))
      .pipe(browserSync.stream());
  };
}

/**
 * Compile Sass.
 */
gulp.task('sass', sassCompile('./src/sass/main.sass'));
gulp.task('sass:structure', sassCompile('./src/sass/structure.scss'));

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
gulp.task('index', ['clean:index'], copy.bind(null, './src/index.html', tmpDir()));

/**
 * Creates structure index.
 */
gulp.task('index:structure', ['clean:structure', 'i18n'], function (done) {
  // sequence('clean:structure', ['i18n', 'sass:structure'], function () {
    copyBase(tmpDir('structure')).on('end', function () {
      var injects = gulp.src(tmpDir('structure/css/structure.css'));

      gulp.src(tmpDir('structure/index.html'))
        .pipe(inject(injects, { relative: true }))
        .pipe(gulp.dest(tmpDir('structure')))
        .on('end', done);
    });
  // });
});

/**
 * Structure distribution task.
 */
gulp.task('dist:structure', ['index:structure'], function () {
  return copy(tmpDir('structure/**/*'), distDir('structure'));
});

/**
 * Main distribution task.
 */
gulp.task('dist', ['index', 'dist:structure'], function () {
  var sources = gulp.src([
    tmpDir('**/*.js'),
    tmpDir('**/*.css'),
  ], { read: false });

  return gulp.src(tmpDir('index.html'))
    .pipe(inject(sources), { relative: true })
    .pipe(gulp.dest(tmpDir()));
});

/**
 * Creates main index.
 */
gulp.task('i18n', ['index'], function (done) {
  loadTranslations(function () {
    async.each(Object.keys(translations), function (language, next) {
      gulp.src(tmpDir('index.html'))
        .pipe(handlebars({ data: translations[language] }))
        // .pipe(i18n({ messages: translations[language] }))
        .pipe(gulp.dest(tmpDir(language == defaultLanguage ? '' : language)))
        .on('end', next);
    }, done);
  });
});

/**
 * Build tmp directory.
 */
gulp.task('build:tmp', [
  'index'
, 'sass'
, 'scripts'
, 'fonts'
, 'images'
, 'i18n'
, 'index:structure'
, 'sass:structure'
]);

/**
 * Build dist directory.
 */
gulp.task('build:dist', ['build:tmp'], function () {

});

/**
 * Main building task.
 */
gulp.task('build', ['build:dist']);
