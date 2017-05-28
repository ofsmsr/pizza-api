var Cart = require('../models/cart-model'),
    CartMethods = Cart.schema.methods;

var response = {};

exports.cartDetails = function cartDetails(req, res) {
    var obj = {
        userId: req.query.userId
    };
    CartMethods.cartDetails(obj).then(function (cartDetailsRes) {
        response.message = 'Cart Details fetched Successfully';
        if (cartDetailsRes && cartDetailsRes.length) {
            for (var cartIndex = 0; cartIndex < cartDetailsRes.length; cartIndex++) {
                if (cartDetailsRes[cartIndex]._doc && cartDetailsRes[cartIndex]._doc.productDetails) {;
                    cartDetailsRes[cartIndex]._doc.productDetails = JSON.parse(cartDetailsRes[cartIndex]._doc.productDetails);
                }
            }
        }
        response.content = cartDetailsRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unable to fetch Cart Details';
        response.content = err;
        res.json(response);
    });
};

exports.createCart = function createCart(req, res) {
    var obj = req.body;
    if (obj.productDetails) {
        obj.productDetails = JSON.stringify(obj.productDetails);
    }
    obj = new Cart(obj);
    CartMethods.createCart(obj).then(function (createCartRes) {
        response.message = 'Cart Placed Successfully';
        response.content = createCartRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unabe to Place Cart';
        response.content = err;
        res.json(response);
    });
};

exports.updateCart = function updateCart(req, res) {
    var obj = req.body;
    if (obj.productDetails) {
        obj.productDetails = JSON.stringify(obj.productDetails);
    }
    obj = new Cart(obj);
    CartMethods.updateCart(obj).then(function (updateCartRes) {
        response.message = 'Cart Updated Successfully';
        response.content = updateCartRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unabe to Update Cart';
        response.content = err;
        res.json(response);
    });
};

exports.deleteCart = function deleteCart(req, res) {
    var obj = {
        userId: req.query.userId
    };
    CartMethods.deleteCart(obj).then(function (deleteCartRes) {
        response.message = 'Cart deleted Successfully';
        response.content = deleteCartRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unabe to delete Cart';
        response.content = err;
        res.json(response);
    });
};