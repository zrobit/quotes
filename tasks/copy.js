// jshint esversion: 6
var gulp = require('gulp'),
  // plumber = require('gulp-plumber'),+
  // changed = require('gulp-changed-in-place'),
  merge = require('merge-stream');
  // livereload = require('gulp-livereload');


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

function styles (){
  var main = gulp
    .src(['src/client/assets/styles/**/*.styl'])
    .pipe(gulp.dest('dist/client/assets/styles/'));

  var components = gulp
    .src(['src/client/components/**/*.styl'])
    .pipe(gulp.dest('dist/client/components/'));

  return merge(main, components);
}
function templates (){
  return gulp
    .src(['src/server/views/**/*.pug'])
    .pipe(gulp.dest('dist/server/views/'))
}


/*
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
*/

// gulp.task('copy:scripts', scripts);
// gulp.task('copy:images', images);
// gulp.task('copy:fonts', fonts);
gulp.task('copy:styles', styles);
gulp.task('copy:templates', templates);
// gulp.task('copy:assets', ['copy:scripts', 'copy:images', 'copy:fonts']);
