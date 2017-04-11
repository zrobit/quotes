module.exports = function(req, res, next) {
  let {page} = req.query;
  if(page === undefined || page === ''){
    req.query.page = 1;
  }

  if (/^[1-9][0-9]*$/.test(req.query.page)){
    next();
  }
  else {
    res.status(403).json({status:"error", message:"bad page parameter"})
  }
};
