

var Question = require('./models/question');

module.exports.create = function(req, res){

	var question = new Question(req.body);
	question.save(function(err, result){
		if(err) throw err;
		res.json(result);
	});
};

module.exports.list = function(req, res){

	Question.find({}, function(err, results){
		if(err) throw err;
		res.json(results);
	});
};

module.exports.remove = function(req, res){

	var id = req.params.id;
	Question.findByIdAndRemove(id, function(err, result){
		if(err) throw err;
		res.json(result);
	});

};