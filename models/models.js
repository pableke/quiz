var path = require("path");
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var db_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//cargo el ORM e indico que la BD es sqlite
var Sequelize = require("sequelize");
var sequelize = new Sequelize(db_name, user, pwd, {
	dialect: dialect, 
	protocol: protocol, 
	port: port, 
	host: host, 
	storage: storage,
	omitNull: true
});

//importar la definicion de la tabla Quiz quiz.js
var Quiz = sequelize.define("quiz", {
	pregunta: Sequelize.STRING, 
	respuesta: Sequelize.STRING
});
exports.Quiz = Quiz;

//sync() crea e inicializa la tabla de preguntas en la BD
sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count > 0) return;
		Quiz.create({ pregunta: "Capital de Italia", respuesta: "Roma" });
		Quiz.create({ pregunta: "Capital de Portugal", respuesta: "Lisboa" });
	});
});
