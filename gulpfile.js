var gulp = require('gulp');

//Develpment tasks
if (process.env.NODE_ENV === 'development') {
  require("./tasks/seed.js");
  require("./tasks/populate.js");
  require("./tasks/sitemap.js");
}
// require("./tasks/watch.js");
// require("./tasks/scripts.js");
// require("./tasks/icons.js");
// require("./tasks/iconfonts.js");
require("./tasks/styles.js");
require("./tasks/copy.js");





// gulp.task('copy', ['copy:assets']);

// gulp.task('dev', ['templates', 'styles', 'copy']);

// gulp.task('deploy', ['templates', 'styles:deploy', 'scripts']);

// gulp.task('default', ['dev']);
