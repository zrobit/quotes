const fs = require('fs');
const gulp = require('gulp');
const sm = require('sitemap');

function siteMapHome() {
  console.log('Generating sitemap-home.xml');

  const urls = [...Array(1000)].map((item, i) => {
    return {
      url: '/pag/' + (i + 1),
      changefreq: 'monthly',
      lastmodISO: '2017-04-10T22:32:50.764Z',
      priority: 0.5
    };
  });

  const options = {
    hostname: 'http://www.fraseary.com',
    urls
  };

  const sitemap = sm.createSitemap(options);
  fs.writeFileSync('../data/sitemaps/sitemap-home.xml', sitemap.toString());
}

gulp.task('sitemap:home', siteMapHome);
