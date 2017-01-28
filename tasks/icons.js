var gulp = require('gulp'),
  rename = require('gulp-rename'),
  svgSymbols = require('gulp-svg-symbols'),
  path = require('path');


function icons () {
  return gulp.src('assets/images/icons/*.svg')
    .pipe(svgSymbols({
      id: 'icon-%f',
      svgClassname: 'svg-icons',
      templates: [
        path.join(__dirname, '../assets/templates/icons.tpl.pug')
      // 'default-svg'
      ]}))
    .pipe(rename("icons.pug"))
    .pipe(gulp.dest('views/includes'));

}


gulp.task('icons', icons);
