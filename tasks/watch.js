// jshint esversion: 6
var gulp = require('gulp'),
    livereload = require('gulp-livereload');


function watch () {
  livereload.listen();
  gulp.watch(['assets/styles/**/*.styl'],['styles']);
  gulp.watch(['assets/scripts/**/*.js'],['copy:scripts']);
  gulp.watch(['views/**/*.pug'], function(){
    livereload.reload();
  });
}


gulp.task('watch', watch);
// module.exports = watch;
