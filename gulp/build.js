
var Q = require('q')
  , fs = require('fs')
  , path = require('path')
  , gulp = require('gulp')
  , sass = require('gulp-sass')
  , async = require('async')
  , gutil = require('gulp-util')
  , yargs = require('yargs')
  , buffer = require('vinyl-buffer')
  , extend = require('extend')
  , inject = require('gulp-inject')
  , rimraf = require('rimraf')
  , source = require('vinyl-source-stream')
  , ghPages = require('gh-pages')
  , jsonfile = require('jsonfile')
  , sequence = require('run-sequence')
  , browserify = require('browserify')
  , handlebars = require('gulp-hb')
  , browserSync = require('browser-sync')
  , autoprefixer = require('gulp-autoprefixer')

  , absolutePath = path.join.bind(null, process.cwd())
  , dir = function (base) { return function (path) { return (base || './') + (path ? '/' + path : ''); }; }

  , srcDirBase = absolutePath('src')
  , srcDir = dir(srcDirBase)
  , tmpDirBase = absolutePath('.tmp')
  , tmpDir = dir(tmpDirBase)

  , defaultLanguage = 'pt-br'
  , i18nDirBase = srcDir('i18n')
  , i18nDir = dir(i18nDirBase)
  , i18nFiles = fs.readdirSync(i18nDirBase).filter(function (filename) {
      return filename.match(/\.json$/);
    })
  , translations = {}

  , ghPageBranch = 'master'

  , wholeCopyIgnores = [tmpDir('structure')].map(function (source) {
      return '!' + source;
    });


/*
 * Tasks Delcaration
 * -----------------
 */

/*
 * Clean-ups.
 */

gulp.task('clean', ['clean:tmp']);
gulp.task('clean:tmp', cleaner(tmpDir()));
gulp.task('clean:structure', cleaner(tmpDir('structure/**/*')));
gulp.task('clean:styleguide', cleaner(tmpDir('styleguide/**/*')));


/*
 * Atomic tasks.
 */

gulp.task('index', ['index:create', 'index:i18n', 'index:inject']);
gulp.task('consulting', ['consulting:create', 'consulting:i18n', 'consulting:inject']);
gulp.task('fonts', copier('./src/fonts/**/*', tmpDir('fonts')));
gulp.task('images', copier('./src/images/**/*', tmpDir('images')));
gulp.task('sass', compiler('./src/sass/main.sass'));
gulp.task('scripts', taskScripts);

/*
 * Index sub-tasks.
 */

gulp.task('index:create', copier('./src/index.html', tmpDir()));
gulp.task('index:inject', ['index:create', 'sass', 'scripts'], taskIndexInject);
gulp.task('index:i18n', ['index:inject'], taskIndexI18n);

/*
 * Consulting sub-tasks.
 */

gulp.task('consulting:create', copier('./src/consulting.html', tmpDir()));
gulp.task('consulting:inject', ['consulting:create', 'sass', 'scripts'], taskConsultingInject);
gulp.task('consulting:i18n', ['consulting:inject'], taskConsultingI18n);

/*
 * Static files copy
 */
//gulp.task('static:cname', copier('./src/CNAME', tmpDir()));

/*
 * Structure atomic tasks.
 */

gulp.task('sass:structure', compiler('./src/sass/structure.scss', 'structure/css'));
gulp.task('index:structure', ['index:structure:create', 'index:structure:inject']);


/*
 * Structure index sub-tasks.
 */

gulp.task('index:structure:create', ['index'], copier(tmpDir('index.html'), tmpDir('structure')));
gulp.task('index:structure:inject', ['index:structure:create', 'sass:structure'], taskIndexStructureInject);


/*
 * Core building tasks.
 */

gulp.task('build', taskBuild);
gulp.task('build:misc', taskBuildMisc);
gulp.task('build:structure', taskBuildStructure);
gulp.task('build:styleguide', ['clean:styleguide'], copier(srcDir('styleguide/**/*'), tmpDir('styleguide')));


/*
 * Deployment tasks.
 */

gulp.task('deploy', ['build'], taskDeploy);


/*
 * Task bodies
 * -----------
 */

function taskScripts() {
  var browserified = browserify({
    entries: './src/js/main.js',
    debug: true
  });

  return browserified.bundle()        // Bundle-up files.
    .on('error', function(err) {
      gutil.log('Browserify error:', gutil.colors.red('\'' + err.message + '\''));
      this.emit('end');
    })
    .pipe(source('taller.js'))        // Rename bundle
    .pipe(buffer())                   // Split into a stream buffer.
    .pipe(gulp.dest(tmpDir('js')));   // Save file.
}

function taskIndexI18n(done) {
  loadTranslations(function () {
    async.each(Object.keys(translations), function (language, next) {
      gulp.src(tmpDir('index.html'))
        .pipe(handlebars({ data: translations[language] }))
        // .pipe(i18n({ messages: translations[language] }))
        .pipe(gulp.dest(tmpDir(language == defaultLanguage ? '' : language)))
        .on('end', next);
    }, done);
  });
}

function taskConsultingI18n(done) {
  loadTranslations(function () {
    async.each(Object.keys(translations), function (language, next) {
      gulp.src(tmpDir('consulting.html'))
        .pipe(handlebars({ data: translations[language] }))
        // .pipe(i18n({ messages: translations[language] }))
        .pipe(gulp.dest(tmpDir(language == defaultLanguage ? '' : language)))
        .on('end', next);
    }, done);
  });
}

function taskIndexInject() {
  var sources = gulp.src([
    tmpDir('js/**/*'),
    tmpDir('css/**/*'),
  ], { read: false });

  return gulp.src(tmpDir('index.html'))
    .pipe(inject(sources, {
      relative: true,
      addRootSlash: true
    }))
    .pipe(gulp.dest(tmpDir()));
}

function taskConsultingInject() {
  var sources = gulp.src([
    tmpDir('js/**/*'),
    tmpDir('css/**/*'),
  ], { read: false });

  return gulp.src(tmpDir('consulting.html'))
    .pipe(inject(sources, {
      relative: true,
      addRootSlash: true
    }))
    .pipe(gulp.dest(tmpDir()));
}

function taskIndexStructureInject() {
  var injects = gulp.src(tmpDir('structure/css/**/*'), { read: false });

  return gulp.src(tmpDir('structure/index.html'))
    .pipe(inject(injects, { relative: true }))
    .pipe(gulp.dest(tmpDir('structure')));
}

function taskBuild(done) {
  sequence('clean', [
    // Core build.
    'index'
  //, 'static:cname'
  , 'sass'
  , 'scripts'
  , 'fonts'
  , 'images'
  ], [
    // Secondary builds.
    'build:styleguide'
  , 'build:structure'
  ], [
    // Other tasks.
    'build:misc'
  ], done);
}

function taskBuildMisc() {
  return copier(srcDir('README.md'), tmpDir())();
}

function taskBuildStructure(done) {
  sequence('clean:structure', [
    'sass:structure',
    'index:structure'
  ], done);
}

function taskDeploy(done) {
  var args = yargs.default('message', false).alias('m', 'message').argv
    , message = args.message || 'Update website.';

  fs.lstat(tmpDir(), function(err, stats) {

    // Safeguard.
    if (err || !stats.isDirectory()) return done('You should run "gulp build" before trying to deploy.');

    ghPages.publish(tmpDir(), {
      branch: ghPageBranch
    }, done);
  });
}


/*
 * Task body generators
 * --------------------
 */

/**
 * Sass compiler generator.
 */
function compiler(entryPoint, endPoint) {
  return function () {
    return gulp.src(entryPoint)
      .pipe(sass.sync().on('error', sass.logError))   // Compile.
      .pipe(autoprefixer({                            // Add browser prefixes.
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest(tmpDir(endPoint || 'css')))     // Save CSS.
      .pipe(browserSync.stream());                    // Update browserSync.
  };
}

/**
 * Copier generator.
 */
function copier(from, to) {
  return function () {
    return gulp.src(from).pipe(gulp.dest(to)).pipe(browserSync.stream());
  };
}

/**
 * Clean generator.
 */
function cleaner(path) {
  return function (done) {
    remove(path).then(done);
  };
}


/*
 * Helpers
 * -------
 */

/**
 * Helper method to load translations.
 */
function loadTranslations(done) {
  async.each(i18nFiles, function (filename, next) {
    jsonfile.readFile(i18nDir(filename), function (err, obj) {
      if (err) {
        gutil.log('i18n error:', gutil.colors.red('"' + err + '"'));
        done(err);
      }
      else translations[filename.slice(0, -5)] = obj;
      next();
    });
  }, function () {
    // Inherit pt-br to all translations.
    if (translations['pt-br']) Object.keys(translations).forEach(function (language) {
      if (language == 'pt-br') return;
      translations[language] = extend(true, {}, translations['pt-br'], translations[language]);
    });

    done();
  });
}

/**
 * Helper method to remove path.
 */
function remove(path) {
  return Q.nfcall(rimraf, path).then(function () {
    gutil.log('Removing', gutil.colors.cyan('\'' + path + '\''));
  });
}
