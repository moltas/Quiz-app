var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./api');


mongoose.connect('mongodb://localhost:27017/questions');

//so we dont have to parse to json
app.use(bodyParser());


//files
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../client/.tmp'));
app.use(express.static(__dirname + '/../client/app'));


//API
app.get('/api/questions', api.list);
app.post('/api/questions/', api.create);
app.delete('/api/questions/:id', api.remove);


var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log('I\'m listening...');
});