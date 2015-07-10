var models = require("../models/models.js");

//Autoload :commentId de comentarios
exports.load = function(req, res, next, commentId){
	models.Comment.find({
		where: { id: Number(commentId) }
	}).then(function(comment){
		if (comment) {
			req.comment = comment;
			return next();
		}
		next(new Error("No existe commentId=" + commentId));
	}).catch(function(error){next(error)});
};

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

//GET /quizes/:id/comments/:commentId/publish
exports.publish = function(req, res) {
	req.comment.publicado = true;
	req.comment.save({ fields: ["publicado"] })
		.then(function(){ res.redirect("/quizes/" + req.params.id); })
		.catch(function(error){ next(error); });
};
