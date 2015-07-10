var users = {
	admin: { id: 1, name: "admin", password: "1234" },
	pepe: { id: 2, name: "pepe", password: "5678" },
};

//autentica los datos del logeo
exports.autenticar = function(login, pass, callback) {
	if (users[login] && (pass === users[login].password)) {
		return callback(null, users[login]);
	}
	else if (users[login]) {
		return callback(new Error("Password erroneo"));
	}
	return callback(new Error("No existe el usuario"));
};
