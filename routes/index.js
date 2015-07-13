var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");
var commentController = require("../controllers/comment_controller");
var sessionController = require("../controllers/session_controller");
var statsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Quiz', errors: {} });
});

/* GET /author. */
router.get('/author', function(req, res, next) {
	res.render('author', { title: 'Quiz', errors: {} });
});

//autoload de comandos con :id
router.param("id", quizController.load);
router.param("commentId", commentController.load);

//definicion de rutas de session
router.get("/login", sessionController.new);
router.post("/login", sessionController.create);
router.get("/logout", sessionController.destroy);

//definicion de rutas de /quizes
router.get("/quizes", quizController.index);
router.get("/quizes/:id(\\d+)", quizController.show);
router.get("/quizes/:id(\\d+)/answer", quizController.answer);
router.get("/quizes/new", sessionController.loginRequired, quizController.new);
router.post("/quizes/create", sessionController.loginRequired, quizController.create);
router.get("/quizes/:id(\\d+)/edit", sessionController.loginRequired, quizController.edit);
router.put("/quizes/:id(\\d+)", sessionController.loginRequired, quizController.update);
router.delete("/quizes/:id(\\d+)", sessionController.loginRequired, quizController.destroy);

//definicion de rutas de comentarios
router.get("/quizes/:id(\\d+)/comments/new", commentController.new);
router.post("/quizes/:id(\\d+)/comments", commentController.create);
router.get("/quizes/:id(\\d+)/comments/:commentId(\\d+)/publish", 
			sessionController.loginRequired, commentController.publish);

//definicion de las rutas de estadisticas
router.get("/quizes/statistics", statsController.stats);

module.exports = router;
