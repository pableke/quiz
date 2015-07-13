
//MW de autorizacion de accesos HTTP
exports.loginRequired = function(req, res, next){
	if (req.session.user) {
		return next();
	}
	res.redirect('/login');
};

//GET /login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};
	res.render("sessions/new", { errors: errors });
};

//POST /login
exports.create = function(req, res) {
	var login = req.body.login;
	var pass = req.body.password;
	
	var userController = require("./user_controller");
	userController.autenticar(login, pass, function (error, user) {
		if (error) {
			req.session.errors = [{"message": "Se ha producido un error: " + error}];
			return res.redirect("/login");
		}
		//guardo en la sesion los datos del usuario
		req.session.user = { id: user.id, name: user.name, time: new Date() };
		res.redirect(req.session.redir.toString());
	});
};

//GET /logout
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};
