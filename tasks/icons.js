const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const svgSymbols = require('gulp-svg-symbols');

function icons() {
  return gulp.src('src/client/assets/images/icons/*.svg')
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgClassname: 'svg-icons',
      templates: [
        path.join(__dirname, '../assets/templates/icons.tpl.pug')
      // 'default-svg'
      ]}))
    .pipe(rename('icons.pug'))
    .pipe(gulp.dest('views/includes'));
}

gulp.task('icons', icons);
