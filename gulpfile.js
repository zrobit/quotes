/* eslint import/no-unassigned-import: 0 */
const gulp = require('gulp');

require('./tasks/seed.js');
require('./tasks/populate.js');
require('./tasks/sitemap.js');
require('./tasks/styles.js');
require('./tasks/copy.js');

gulp.task('copy', ['copy:assets']);
