//Load app
const app = require('./app.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Mongoose configuration
if (process.env.NODE_ENV==='production'){
  mongoose.connect('mongodb://localhost/fraseary-production');

} else {
  mongoose.connect('mongodb://localhost/fraseary-local');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database is Ready')
  // we're connected!
});

app.listen(3000, function () {
  console.log('Server is Ready');
});

module.exports = app;
