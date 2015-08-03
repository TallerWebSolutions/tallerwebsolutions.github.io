
var gulp = require('gulp')
  , browserSync = require('browser-sync')

  , watchMaps = [{
      source: ['./src/index.html', './src/i18n/**/*'],
      tasks: ['index', 'index:structure'],
      name: 'markup'
    }, {
      source: './src/sass/**/*',
      tasks: ['sass', 'sass:structure'],
      name: 'styles'
    }, {
      source: './src/js/**/*',
      tasks: 'scripts',
      name: 'scripts'
    }, {
      source: './src/styleguide/**/*',
      tasks: 'build:styleguide',
      name: 'styleguide'
    }];

// Generate watchers.
watchMaps.forEach(prepareWatcher);


/*
 * Task definitions
 * ----------------
 */

watchMaps.forEach(defineWatchingTasks);

gulp.task('watch', ['build'], taskWatch);
gulp.task('serve', ['watch'], taskServe);
gulp.task('develop', ['serve']);


/*
 * Task bodies
 * -----------
 */

function taskWatch() {
  watchMaps.forEach(initiateWatcher);
}

function taskServe() {
  browserSync.init({
    server: {
      baseDir: '.tmp'
    }
  });

  gulp.watch([
    '.tmp/**/*',
    '!.tmp/**/*.css'
  ]).on('change', browserSync.reload);
}


/*
 * Watcher operations
 * ------------------
 */

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
function defineWatchingTasks(map) {
  gulp.task('watch:' + map.name, map.tasks, map.watcher);
}

/**
 * Helper method to initiate watchers.
 */
function initiateWatcher(map) {
  map.watcher();
}
