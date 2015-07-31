/**
 * @file Main gulp file.
 */

// Load all tasks.
require('require-dir')('./gulp', { recurse: true });

// Register default task.
require('gulp').task('default', ['build']);
