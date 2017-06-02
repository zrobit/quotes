const gulp = require('gulp');
const sm = require('sitemap');
const fs = require('fs');


function siteMapHome(){
  console.log('Generating sitemap-home.xml');

  let urls = [...Array(1000)].map((item, i) => {
    return {
      url: '/pag/'+(i+1),
      changefreq: 'monthly',
      lastmodISO: '2017-04-10T22:32:50.764Z',
      priority: 0.5
    };
  })

  let options = {
    hostname: 'http://www.fraseary.com',
    urls: urls
  };

  var sitemap = sm.createSitemap(options)
  fs.writeFileSync("../data/sitemaps/sitemap-home.xml", sitemap.toString());
}


gulp.task('sitemap:home', siteMapHome);
