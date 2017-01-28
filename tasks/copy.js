// jshint esversion: 6
var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  changed = require('gulp-changed-in-place'),
  livereload = require('gulp-livereload');


const src = {
  scripts: ['assets/scripts/**/*.js'],
  images: ['assets/images/**/*', '!assets/images/icons/**/*'],
  fonts: ['assets/fonts/**/*']
};


const dest = {
  scripts: '.tmp/public/scripts/',
  images: '.tmp/public/images/',
  fonts: '.tmp/public/fonts/'
};

function scripts (){
  return gulp
    .src(src.scripts)
    // .pipe(plumber())
    // .pipe(changed())
    .pipe(gulp.dest(dest.scripts))
    .pipe(livereload());
}


function images (){
  return gulp
    .src(src.images)
    .pipe(gulp.dest(dest.images));
}


function fonts (){
  return gulp
    .src(src.fonts)
    .pipe(gulp.dest(dest.fonts));
}


gulp.task('copy:scripts', scripts);
gulp.task('copy:images', images);
gulp.task('copy:fonts', fonts);
gulp.task('copy:assets', ['copy:scripts', 'copy:images', 'copy:fonts']);
