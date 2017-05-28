'use strict';
var mongoose = require('mongoose');

mongoose.connect('mongodb://Paramstech:Params%40Aws123@cluster0-shard-00-00-iwj3j.mongodb.net:27017/pizzadata?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Error in Mongodb Connection ' + err);
});
db.once('open', function() {
  console.log('Mongodb Connected Successfully')
});

module.exports = mongoose;