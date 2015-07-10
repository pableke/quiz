var models = require("../models/models.js");

//GET quizes/:id/comments/new
exports.new = function(req, res) {
	res.render("comments/new", { quizId: req.params.id, errors: {} });
};

//POST quizes/:id(\\d+)/comments
exports.create = function(req, res) {
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.id
	});
	comment.validate().then(function(err) {
		if (err) {
			res.render("comments/new", { comment: comment, quizId: req.params.id, errors: err.errors });
		}
		else {
			comment.save().then(function() { res.redirect("/quizes/" + req.params.id); });
		}
	});
};
