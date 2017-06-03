const express = require('express');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000/api/'
});


const Meta = require('../models/meta');

const ssr = global.ssr

var router = express.Router();

function getMeta(param){
  return  new Promise(function(resolve, reject){
    Meta.findOne({}).exec(function(err, meta){
      if(err) throw err;
      resolve(meta);
    });
  })

}

function getQuotes(page){
  return new Promise(function(resolve, reject){
   api.get('/quotes?page=' + page)
    .then(function(response){
      resolve(response.data);
    })

  })
}


//total quotes 10620
function HomeControllerOld(req, res){
  let page = req.params.page;

  if (/^[1-9][0-9]*$/.test(page)){
    page = parseInt(page)
  } else {
    page = 1
  }

  let context = {
    prevPage: page === 1 ? 1062 : page - 1,
    nextPage:  page === 1062 ? 1 : page + 1
  };

  api.get('/quotes?page=' + page)
    .then(function(response){
      let state = {
        quote: response.data
      }
      context.state = state;
      ssr(req, res, context)
    })
}
//TEsting
//total quotes 10620
function HomeController(req, res){
  let page = req.params.page;

  if (/^[1-9][0-9]*$/.test(page)){
    page = parseInt(page)
  } else {
    page = 1
  }

  let context = {
    prevPage: page === 1 ? 1062 : page - 1,
    nextPage:  page === 1062 ? 1 : page + 1
  };

  Promise.all([getMeta('hi'), getQuotes(page)]).then(function(values){
      let state = {
        quote: values[1]
      }
      context.meta = values[0];
      context.state = state;
      ssr(req, res, context)
  })
}


router.get('/', HomeController);

router.get('/pag/:page', HomeController);

module.exports = router;
