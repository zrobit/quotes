// jshint esversion: 6
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed-in-place'),
    htmlmin = require('gulp-htmlmin'),
    prettify = require('gulp-prettify');

const src= [
  'templates/**/*.jade',
  '!templates/**/_*.jade',
  '!templates/includes/**/*.jade'
  ];
const dest = path.templates;

handler.set_env('deploy');

function templates_watch(){
  return gulp
    .src(src)
    .pipe(plumber())
    .pipe(changed())
    .pipe(jade({locals: handler, pretty:true}))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

function templates(){
  return gulp
    .src(src)
    .pipe(jade({locals: handler, pretty:true}))
    .pipe(gulp.dest(dest));
}

function templates_deploy(){
  return gulp
    .src(src)
    .pipe(jade({locals: handler, pretty:true}))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true
    }))

    // .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(dest));
}


gulp.task('templates:watch', templates_watch);
gulp.task('templates', templates);
gulp.task('templates:deploy', templates_deploy);
