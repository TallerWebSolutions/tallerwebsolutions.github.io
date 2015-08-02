
var gulp = require('gulp')
  , sequence = require('run-sequence')
  , browserSync = require('browser-sync')

  , watchMaps = [{
      source: ['./src/index.html', './i18n/**/*'],
      tasks: ['index', 'i18n', 'index:structure']
    }, {
      source: './src/sass/**/*',
      tasks: ['sass', 'sass:structure']
    }, {
      source: './src/js/**/*',
      tasks: 'scripts'
    }, {
      source: './src/styleguide/**/*',
      tasks: 'styleguide'
    }];

watchMaps.forEach(prepareWatcher);
watchMaps.forEach(createWatchingTasks);

/**
 * Helper method to create watchers.
 */
function prepareWatcher(map) {
  map.tasks = Array.isArray(map.tasks) ? map.tasks : [map.tasks];
  map.watcher = function () {
    gulp.watch(map.source, map.tasks);
  };
}

/**
 * Helper method to create watching tasks.
 */
function createWatchingTasks(map) {
  gulp.task('watch:' + map.tasks.join(':'), map.tasks, map.watcher);
}

/**
 * Helper method to initiate watchers.
 */
function initiateWatcher(map) {
  map.watcher();
}

/**
 * Helper task to initiate all watch maps.
 */
gulp.task('watch', ['build:tmp'], function () {
  watchMaps.forEach(initiateWatcher);
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

  gulp.watch([
    '.tmp/**/*',
    '!.tmp/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('dev', ['serve']);
