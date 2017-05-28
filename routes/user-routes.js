module.exports = function (app) {
    var user = require('../controllers/user-controller');

    app.route('/login').post(user.login);
    app.route('/registration').post(user.registration);

};