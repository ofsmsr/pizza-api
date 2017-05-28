module.exports = function (app) {
    var cart = require('../controllers/cart-controller');

    app.route('/cart')
        .get(cart.cartDetails)
        .post(cart.createCart)
        .put(cart.updateCart)
        .delete(cart.deleteCart);

};