// jshint esversion: 6
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss');

function styles (){
  var plugins = [
      require("css-mqpacker")(),
      require('autoprefixer')(),
      require('cssnano')(),
  ];
  return gulp
    .src([
      './dist/public/assets/styles/main.css',
      './dist/public/assets/styles/chunks.css'
    ])
    .pipe(concat('main.min.css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/public/assets/styles/'));
}

gulp.task('styles:prod', styles);
