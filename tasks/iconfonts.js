// jshint esversion: 6
var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate');


function iconfonts () {
  var fontName= 'iconfont';
  return gulp.src(['assets/images/icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      formats: ['ttf', 'eot', 'woff', 'svg'],
      fontHeight: 512,
      normalize: true,
    }))

    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph){
          return {name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0).toString(16) };
        }),
        fontName: fontName,
        fontPath: '../fonts/icons/',
      };
      gulp.src('assets/styles/templates/iconsfonts.styl')
        .pipe(consolidate('lodash', options))
        .pipe(gulp.dest('assets/styles/modules/components'));
    })
    .pipe(gulp.dest('assets/fonts/icons/'));
}


gulp.task('iconfonts', iconfonts);
