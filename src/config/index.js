const path = require('path');

const basePath = path.resolve(__dirname);

const srcPath = path.resolve(basePath, '../');
const projectPath = path.resolve(srcPath, '../');

const assetsPath = path.join(srcPath, 'client/assets');
const assetsPublic = path.join(projectPath, 'dist/public/assets');

exports.MEDIA_IMAGES = path.join(projectPath, 'media/images');
exports.ASSETS_IMAGES = path.join(assetsPath, 'images');
exports.ASSETS_FONTS = path.join(assetsPath, 'fonts');
exports.ASSETS_STYLES = path.join(assetsPath, 'styles');
exports.PUBLIC_STYLES = path.join(assetsPublic, 'styles');
