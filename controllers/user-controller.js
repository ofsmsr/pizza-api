var Users = require('../models/user-model'),
    UsersMethods = Users.schema.methods;

var response = {};

exports.login = function login(req, res) {
    var obj = req.body;
    UsersMethods.login(obj).then(function (loginRes) {
        response.message = 'Login Successfully';
        response.content = loginRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Login Failed';
        response.content = err;
        res.status(401).send(response)
    });
};

exports.registration = function registration(req, res) {
    var obj = new Users(req.body);
    UsersMethods.registration(obj).then(function (createUserRes) {
        response.message = 'User Registration Successfully';
        response.content = createUserRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'User Registration Failed';
        response.content = err;
        res.json(response);
    });
};