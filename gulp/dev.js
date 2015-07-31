
var gulp = require('gulp')
  , sequence = require('run-sequence')
  , browserSync = require('browser-sync')

  , watchMap = {
      './src/index.html': ['index', 'index:structure'],
      './src/sass/**/*' : 'sass',
      './src/js/**/*'   : 'scripts',
      './src/i18n/**/*' : 'i18n',
    }

  , sources = Object.keys(watchMap)
  , taskGroups = sources.map(function (source, index) {
      return Array.isArray(watchMap[source]) ? watchMap[source] : [watchMap[source]];
    })
  , watchers = sources.map(function (source, index) {
      return function () {
        gulp.watch(sources, taskGroups[index]);
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
gulp.task('dev', ['watch'], function () {
  browserSync.init({
    server: {
      baseDir: '.tmp'
    }
  });

  gulp.watch('.tmp/**/*').on('change', browserSync.reload);
});
