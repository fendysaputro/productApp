var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/api/product');
var app = express();

//set mongodb connection
var mongoose = require('mongoose');
var config = require("./config/config").mongoURI;

mongoose
    .connect(config)
    .then(() => console.log("mongoDB Connected"))
    .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function(req, res, next ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

 //routes
 app.use(express.static('public'));
 app.use('/api/products', product);

 app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
 });

 //start server
 var port = process.env.PORT || 5002;
 app.listen(port);
 console.log("Go to http://localhost:" + port);