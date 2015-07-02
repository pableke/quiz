var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Quiz' });
});

/* GET /author. */
router.get('/author', function(req, res, next) {
	res.render('author', { title: 'Quiz' });
});

router.get("/quizes", quizController.index);
router.get("/quizes/:id(\\d+)", quizController.show);
router.get("/quizes/:id(\\d+)/answer", quizController.answer);

module.exports = router;
