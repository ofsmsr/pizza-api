var q = require('q'),
    db = require('./mongoosedb');

var CartSchema = new db.Schema({
    userId: {
        type: String
    },
    productDetails: {
        type: String
    },
    date: {
        type: String
    }
},{
    collection: 'cart'
});

var Cart = {};

CartSchema.methods.cartDetails = function cartDetails(obj) {
    var deferred = q.defer();
    try {
        Cart.find(obj, function (err, cartDetailsRes) {
            if (err) deferred.reject(err);
            deferred.resolve(cartDetailsRes);
        });
        return deferred.promise;
    }
    catch (cartDetailsException) {
        deferred.reject(cartDetailsException);
        console.log(cartDetailsException);
    }
};

CartSchema.methods.createCart = function createCart(obj) {
    var deferred = q.defer();
    try {
        obj.save(function (err, createCartRes) {
            if (err) deferred.reject(err);
            deferred.resolve(createCartRes);
        });
        return deferred.promise;
    }
    catch (createCartException) {
        deferred.reject(createCartException);
        console.log(createCartException);
    }
};

CartSchema.methods.updateCart = function updateCart(obj) {
    var deferred = q.defer();
    try {
        Cart.findByIdAndUpdate({_id: obj._id}, obj, {new: true}, function (err, updateCartRes) {
            if (err) deferred.reject(err);
            deferred.resolve(updateCartRes);
        });
        return deferred.promise;
    }
    catch (updateCartException) {
        deferred.reject(updateCartException);
        console.log(updateCartException);
    }
};

CartSchema.methods.deleteCart = function deleteCart(obj) {
    var deferred = q.defer();
    try {
        Cart.remove(obj, function (err, deleteCartRes) {
            if (err) deferred.reject(err);
            deferred.resolve(deleteCartRes);
        });
        return deferred.promise;
    }
    catch (deleteCartException) {
        deferred.reject(deleteCartException);
        console.log(deleteCartException);
    }
};

Cart = db.model('Cart', CartSchema);
module.exports = Cart;