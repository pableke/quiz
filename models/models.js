//cargo el ORM e indico que la BD es sqlite
var Sequelize = require("sequelize");
var sequelize = new Sequelize(null, null, null, 
							{ dialect: "sqlite", storage: "quiz.sqlite" });

//importar la definicion de la tabla Quiz quiz.js
var Quiz = sequelize.define("quiz", {
	pregunta: "Capital de Italia", 
	respuesta: "Roma"
});
exports.Quiz = Quiz;

//sync() crea e inicializa la tabla de preguntas en la BD
sequelize.sync().then(function() {
	return Quiz.create({ pregunta: "Capital de Italia", respuesta: "Roma" });
});
