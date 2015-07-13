var models = require("../models/models.js");

//GET stats
exports.stats = function(req, res) {
	models.Quiz.findAll({ include:[{ model: models.Comment }] })
		.then(function(preguntas) {
			models.Comment.count().then(function(comments) {
				var nPreguntas = preguntas.length;
				var media = comments / nPreguntas;
				var conComment = 0;
				for (var i = 0; i < nPreguntas; i++) {
					conComment += (preguntas[i].Comments.length > 0);
				}
				var sinComment = nPreguntas - conComment;
				res.render("statistics", {
						numPreguntas: nPreguntas, 
						numComments: comments, 
						media: media, 
						conComment: conComment, 
						sinComment: sinComment, 
						errors: []
					});
		});
	});
};
