const gulp = require('gulp');
const merge = require('merge-stream');

const src = {
  images: ['src/client/assets/images/**/*', '!src/client/assets/images/icons/**/*'],
  fonts: ['src/client/assets/fonts/**/*']
};

const dest = {
  images: 'dist/public/assets/images/',
  fonts: 'dist/public/assets/fonts/'
};

function styles() {
  const main = gulp
    .src(['src/client/assets/styles/**/*.styl'])
    .pipe(gulp.dest('dist/client/assets/styles/'));

  const components = gulp
    .src(['src/client/components/**/*.styl'])
    .pipe(gulp.dest('dist/client/components/'));

  return merge(main, components);
}

function templates() {
  return gulp
    .src(['src/server/views/**/*.pug'])
    .pipe(gulp.dest('dist/server/views/'));
}

function images() {
  return gulp
    .src(src.images)
    .pipe(gulp.dest(dest.images));
}

// gulp.task('copy:images', images);
// gulp.task('copy:fonts', fonts);
gulp.task('copy:styles', styles);
gulp.task('copy:images', images);
gulp.task('copy:templates', templates);
// gulp.task('copy:assets', ['copy:scripts', 'copy:images', 'copy:fonts']);
