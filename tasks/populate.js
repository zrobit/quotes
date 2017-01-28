// jshint esversion: 6
var gulp = require('gulp');
var Sails = require('sails');
var casual = require('casual');
var glob = require('glob');
var sizeOf = require('image-size-big-max-buffer');
var fs = require('fs-extra');
var path = require('path');
// var App = new Sails();
var slug = require('slug');


function populateImages () {
  var img;
  var sizes;
  var ext;
  var newPath;

  Sails.load(function(err, sails) {

    glob('.tmp/public/media/temp/**/*', function(err, files){
      console.log(files);
      files.forEach(function(file) {

        sizes = sizeOf(file);
        console.log(sizes.width+'x'+sizes.height);
        ext = path.extname(file);
        if (ext == '.jpeg'){
          ext = '.jpg';
        }

        img = {
          alt: casual.words(n=Math.random() < 0.5 ? 2 : 3),
          ext: ext,
          width: sizes.width,
          height: sizes.height
        };

        Image.create(img).exec(function (err, img) {
          newPath = '.tmp/public/media/images/'+img.id+'/'+img.id+'-'+img.width+'x'+img.height+img.ext;
          fs.copy(file, newPath, function (err) {
            if (err) return console.error(err);
          });
            console.log(newPath);

        });
      });
    });

  });
  // process.exit();
}


function populateTools () {
  Sails.load(function(err, sails) {

    var items = [];
    for(var i=0; i<17 ; i++){
      var item = {
        name: casual.words(n=Math.random() < 0.5 ? 1 : 2),
        tagline: casual.words(n=Math.random() < 0.5 ? 4:5),
        description: casual.description
      };
      items[i] = item;
    }

    Tool.create(items).exec(function (err, item) {
      console.log('end to create items');
      process.exit();
    });
  });
}

function populateToolsImages () {
  Sails.load(function(err, sails){
    Image.find().exec(function(err, items){
      sails.log.debug(items);
      items.forEach(function(item, i){
        sails.log.debug('item id: '+ item.id);
        sails.log.debug('item index: '+ i);
        Tool.findOne({id: i+1}).exec(function(err, tool){
          // sails.log.debug('data: '+JSON.stringify(tool.img));
          tool.img = item.id;
          tool.save();
          // sails.log.debug('item: '+JSON.stringify(item.id));
          // sails.log.debug('dentro item.id: ' + item.id);
          // tool.img.add(item.id);
          // tool.save();
          console.log('Items relaciones: '+ tool.id);
        });
      });
    });
  });
}

function populateTags () {
  var objs = [];
  Sails.load(function(err, sails){
    Tool.find().populate('tags').exec(function(err, tools){
      tools.forEach(function(tool, index){

        var rand = Math.random() < 0.5 ? 1 : 2;
        var obj = {
          name: casual.words(n=rand),
        };
        Tag.findOrCreate({slug:slug(obj.name)}, obj).exec(function(err, data){
          console.log(data);
          if(data){
            tool.tags.add(data.id);
            tool.save();

          }
        });

      });
    });
  });
}

gulp.task('populate:tools', populateTools);
gulp.task('populate:tags', populateTags);
gulp.task('populate:images', populateImages);
gulp.task('populate:toolsImages', populateToolsImages);

