
var gulp = require('gulp')
  , sequence = require('run-sequence')
  , browserSync = require('browser-sync')

  , watchMap = {
      'index': './src/index.html',
      'sass': './src/sass/**/*',
      'scripts': './src/js/**/*',
      'i18n': './src/i18n/**/*'
    }
  , tasks = Object.keys(watchMap)
  , watchers = tasks.map(function (task) {
      return function () {
        gulp.watch(watchMap[task], [task]);
      };
    });



/**
 * Create watching tasks.
 */
tasks.forEach(function (task, index) {
  gulp.task('watch:' + task, [task], watchers[index]);
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
