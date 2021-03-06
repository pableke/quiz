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

//cargo el Modelo ORM
var Sequelize = require("sequelize");

//Uso la BD sqlite o postgres
var sequelize = new Sequelize(db_name, user, pwd, {
	dialect: dialect, 
	protocol: protocol, 
	port: port, 
	host: host, 
	storage: storage,
	omitNull: true
});

//importar la definicion de la tabla Quiz de ./quiz.js
var quiz_path = path.join(__dirname, "quiz");
var Quiz = sequelize.import(quiz_path);
exports.Quiz = Quiz; //exportar tabla quiz

//importar la definicion de la tabla Comment de ./comment.js
var comment_path = path.join(__dirname, "comment");
var Comment = sequelize.import(comment_path);
exports.Comment = Comment; //exportar tabla Comment

//definimos la relacion entre Comment y Quiz
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//sync() crea e inicializa la tabla de preguntas en la BD
sequelize.sync().then(function() {
	Quiz.count().then(function(count) {
		if (count > 0) return;
		Quiz.create({ pregunta: "Capital de Italia", respuesta: "Roma", tema: "ciencia" });
		Quiz.create({ pregunta: "Capital de Portugal", respuesta: "Lisboa", tema: "humanidades" });
	});
});
