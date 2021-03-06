var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./api');

//lets our port be set by heroku
var port = Number(process.env.PORT || 3000);

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/questions';

mongoose.connect("mongodb://kastasten:databas123@ds039301.mongolab.com:39301/questions");

//so we dont have to parse to json
app.use(bodyParser());


//files

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/app'));


//API
app.get('/api/questions', api.list);
app.post('/api/questions/', api.create);
app.delete('/api/questions/:id', api.remove);



app.listen(port, function(){
	console.log('I\'m listening...');
});