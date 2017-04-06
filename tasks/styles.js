// jshint esversion: 6
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    nib = require('nib'),
    stylus = require('gulp-stylus'),
    postcss = require('gulp-postcss'),
    gzip = require('gulp-gzip');

const src = ['src/client/assets/styles/main.styl'];
const dest = './dist/public/assets/styles/';

function styles_build () {
  return gulp
    .src(src)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(dest))
}

function styles_prod (){
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
    .pipe(gulp.dest(dest))
    .pipe(gzip())
    .pipe(gulp.dest(dest));
}

gulp.task('styles:build', styles_build);
gulp.task('styles:prod', styles_prod);
