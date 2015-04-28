var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./api');


mongoose.connect('mongodb://localhost:27017/questions');

app.use(bodyParser());


//files
// app.use('/bower_components',  express.static(__dirname + '/../client/bower_components'));
// app.use(express.static(__dirname + '/../client/app'));
// app.use('/js', express.static(__dirname + '/../client/app/js'));
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../client/.tmp'));
app.use(express.static(__dirname + '/../client/app'));


//API
app.get('/api/questions', api.list);
app.post('/api/questions/', api.create);
app.delete('/api/questions/:id', api.remove);


app.listen(3000, function(){
	console.log('I\'m listening...');
});