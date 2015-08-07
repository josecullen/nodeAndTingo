var express = require('express');
var querystring = require("querystring");
var url = require("url");

var Engine = require('tingodb')(),
    assert = require('assert');
var db = new Engine.Db('./db', {});

var fs = require('fs');

var router = express.Router();
var srcPath = "hola.txt";

/* GET home page. */
router.get('/', function(req, res, next) {
  
  showAll();
  res.render('index', { title: 'Express' });
});



router.get('/userget', function(req, res, next) {
	var query = url.parse(req.url).query;
	var name = querystring.parse(query)["name"];    


	insertDocuments(name, db, function(error) {	    
	    console.log('err ', error);	    
	    error == null ? res.end('ok') : res.end('nook');
	    //db.close();
    });

});

var insertDocuments = function(name, db, callback) {
  var collection = db.collection('user');
  collection.insert(
  	{name : name}, function(err, result) {
    callback(err);
  });
}

var showAll = function() {
  var collection = db.collection('user');
  var cursor = collection.find({});
  cursor.each(function(err, doc){
    console.log(doc);
  });
  
    
}





module.exports = router;
