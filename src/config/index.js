const path = require('path');


//directorio: ./config
const basePath = path.resolve(__dirname)

const srcPath = path.resolve(basePath, '../')
const projectPath = path.resolve(srcPath, '../')

const assetsPath = path.join(srcPath, 'assets')

exports.MEDIA_IMAGES = path.join(projectPath, 'media/images')
