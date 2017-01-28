// jshint esversion: 6
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    livereload = require('gulp-livereload');

const src = ['assets/styles/main.styl'];
const dest = '.tmp/public/styles/';

function styles () {
  return gulp
    .src(src)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(dest))
    .pipe(livereload());
}

function styles_deploy (){
  var postcss = require('gulp-postcss');
  var plugins = [
      require("css-mqpacker")(),
      require('autoprefixer')(),
      require('cssnano')(),
  ];
  return gulp
    .src(dest+'main.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest(dest));

}

gulp.task('styles', styles);
gulp.task('styles:deploy', styles_deploy);
// module.exports = styles;
