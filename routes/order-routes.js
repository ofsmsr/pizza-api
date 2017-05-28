module.exports = function (app) {
    var order = require('../controllers/order-controller');

    app.route('/order')
        .get(order.orderHistory)
        .post(order.createOrder);

};