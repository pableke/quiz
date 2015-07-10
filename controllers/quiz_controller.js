var models = require("../models/models.js");

//AUTOLOAD :id
exports.load = function(req, res, next, id) {
	models.Quiz.find({
		where: { id: Number(id) },
		include: [{ model: models.Comment }]
	}).then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			return next();
		}
		next(new Error("No existe el id = " + id));
	}).catch(function(err) { next(err); });
};

//GET quizes
exports.index = function(req, res) {
	var search = req.query.search || "";
	search = "%" + search.replace(" ", "%").toLowerCase() + "%";
	models.Quiz.findAll({where: ["lower(pregunta) like ?", search]}).then(function(quizes) {
		res.render("quizes/index", { quizes: quizes, errors: {} });
	});
};

//GET quizes/:id
exports.show = function(req, res) {
	models.Quiz.findById(req.params.id).then(function(quiz) {
		res.render("quizes/show", { quiz: req.quiz, errors: {} });
	});
};

//GET quizes/:id/answer
exports.answer = function(req, res) {
	models.Quiz.findById(req.params.id).then(function(quiz) {
		var resultado = ((req.query.respuesta === quiz.respuesta) ? "Correcto" : "Incorrecto");
		res.render("quizes/answer", { quiz: req.quiz, respuesta: resultado, errors: {} });
	});
};

//GET quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build({ pregunta: "", respuesta: "" });
	res.render("quizes/new", { quiz: quiz, errors: {} });
};

//POST quizes/create
exports.create = function(req, res) {
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err) {
		if (err) {
			res.render("quizes/new", { quiz: quiz, errors: err.errors });
		}
		else {
			quiz.save({ fields: ["pregunta", "respuesta", "tema"] })
				.then(function() { res.redirect("/quizes"); });
		}
	});
};

//GET quizes/:id/edit
exports.edit = function(req, res) {
	var quiz = req.quiz; //autoload de instancia de quiz
	res.render("quizes/edit", { quiz: quiz, errors: {} });
};

//PUT quizes/:id
exports.update = function(req, res) {
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;
	req.quiz.validate().then(function(err) {
		if (err) {
			res.render("quizes/edit", { quiz: req.quiz, errors: err.errors });
		}
		else {
			req.quiz.save({ fields: ["pregunta", "respuesta", "tema"]})
					.then(function() { res.redirect("/quizes"); });
		}
	});
};

//delete quizes/:id
exports.destroy = function(req, res) {
	req.quiz.destroy().then(function() {
		res.redirect("/quizes");
	}).catch(function(err) { next(err); });
};
