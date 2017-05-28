var q = require('q'),
    db = require('./mongoosedb');

var OrderSchema = new db.Schema({
    userId: {
        type: String,
    },
    productDetails: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: String,
    }
},{
    collection: 'orders'
});

var Orders = {};

OrderSchema.methods.orderHistory = function orderHistory(obj) {
    var deferred = q.defer();
    try {
        Orders.find(obj, function (err, orderHistoryRes) {
            if (err) deferred.reject(err);
            deferred.resolve(orderHistoryRes);
        });
        return deferred.promise;
    }
    catch (orderHistoryException) {
        deferred.reject(orderHistoryException);
        console.log(loginException);
    }
};

OrderSchema.methods.createOrder = function createOrder(obj) {
    var deferred = q.defer();
    try {
        obj.save(function (err, createOrderRes) {
            if (err) deferred.reject(err);
            deferred.resolve(createOrderRes);
        });
        return deferred.promise;
    }
    catch (createOrderException) {
        deferred.reject(createOrderException);
        console.log(createOrderException);
    }
};

Orders = db.model('Orders', OrderSchema);
module.exports = Orders;