/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file inside gulp directory. Any files in that directory
  get automatically required below.
  To add a new task, simply add a new task file that directory..
*/

// Load all tasks.
require('require-dir')('./gulp', { recurse: true });

// Register default task.
require('gulp').task('default', ['build']);
