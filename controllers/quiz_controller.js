var models = require("../models/models.js");

//AUTOLOAD
exports.load = function(req, res, next, id) {
	models.Quiz.findById(id).then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			return next();
		}
		next(new Error("No existe id=" + id));
	}).catch(function(err) { next(err); });
};

//GET quizes
exports.index = function(req, res) {
	var search = req.query.search || "";
	search = "%" + search.replace(" ", "%") + "%";
	models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes) {
		res.render("quizes/index", { quizes: quizes });
	});
};

//GET quizes/:id
exports.show = function(req, res) {
	models.Quiz.findById(req.params.id).then(function(quiz) {
		res.render("quizes/show", { quiz: req.quiz });
	});
};

//GET quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.findById(req.params.id).then(function(quiz) {
		var resultado = ((req.query.respuesta === quiz.respuesta) ? "Correcto" : "Incorrecto");
		res.render("quizes/answer", { quiz: req.quiz, respuesta: resultado });
	});
};
