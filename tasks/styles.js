const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const nib = require('nib');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const gzip = require('gulp-gzip');

const src = ['src/client/assets/styles/main.styl'];
const dest = './dist/public/assets/styles/';

function stylesBuild() {
  return gulp
    .src(src)
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(dest));
}

function stylesProd() {
  const plugins = [
    require('css-mqpacker')(),
    require('autoprefixer')(),
    require('cssnano')()
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

gulp.task('styles:build', stylesBuild);
gulp.task('styles:prod', stylesProd);
