var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var question = new Schema({
	image: String,
	text: String,
	choices: [
		{text: String, correct: Boolean, selected: Boolean},
		{text: String, correct: Boolean, selected: Boolean},
		{text: String, correct: Boolean, selected: Boolean},
		{text: String, correct: Boolean, selected: Boolean},
	]
})


module.exports = mongoose.model('Question', question);