var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");

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

//definicion de rutas de /quizes
router.get("/quizes", quizController.index);
router.get("/quizes/:id(\\d+)", quizController.show);
router.get("/quizes/:id(\\d+)/answer", quizController.answer);
router.get("/quizes/new", quizController.new);
router.post("/quizes/create", quizController.create);
router.get("/quizes/:id(\\d+)/edit", quizController.edit);
router.put("/quizes/:id(\\d+)", quizController.update);
router.delete("/quizes/:id(\\d+)", quizController.destroy);

module.exports = router;
