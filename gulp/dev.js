
var gulp = require('gulp')
  , sequence = require('run-sequence')
  , browserSync = require('browser-sync')

  , watchMap = {
      './src/index.html': ['index', 'i18n', 'index:structure'],
      './src/sass/**/*' : ['sass', 'sass:structure'],
      './src/js/**/*'   : 'scripts',
      './i18n/**/*' : 'i18n',
    }

  , sources = Object.keys(watchMap)
  , taskGroups = sources.map(function (source, index) {
      return Array.isArray(watchMap[source]) ? watchMap[source] : [watchMap[source]];
    })
  , watchers = sources.map(function (source, index) {
      return function () {
        gulp.watch(source, taskGroups[index]);
      };
    });

/**
 * Create watching tasks.
 */
taskGroups.forEach(function (tasks, index) {
  gulp.task('watch:' + tasks.join(':'), tasks, watchers[index]);
});

/**
 * Helper task to initiate all watch maps.
 */
gulp.task('watch', ['build:tmp'], function () {
  watchers.forEach(function (watcher) {
    watcher();
  });
});

/**
 * Main development task.
 */
gulp.task('serve', ['watch'], function () {
  browserSync.init({
    server: {
      baseDir: '.tmp'
    }
  });

  gulp.watch(['.tmp/**/*', '!.tmp/**/*.css']).on('change', browserSync.reload);
});

gulp.task('dev', ['serve']);
