// jshint esversion: 6
var gulp = require('gulp'),
  // plumber = require('gulp-plumber'),+
  // changed = require('gulp-changed-in-place'),
  merge = require('merge-stream');
  // livereload = require('gulp-livereload');


const src = {
  images: ['src/client/assets/images/**/*', '!src/client/assets/images/icons/**/*'],
  fonts: ['src/client/assets/fonts/**/*']
};


const dest = {
  images: 'dist/public/assets/images/',
  fonts: 'dist/public/assets/fonts/'
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
function images (){
  return gulp
    .src(src.images)
    .pipe(gulp.dest(dest.images));
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
gulp.task('copy:images', images);
gulp.task('copy:templates', templates);
// gulp.task('copy:assets', ['copy:scripts', 'copy:images', 'copy:fonts']);
