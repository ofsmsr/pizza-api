var Orders = require('../models/order-model'),
    OrderMethods = Orders.schema.methods;

var response = {};

exports.orderHistory = function orderHistory(req, res) {
    var obj = {
        userId: req.query.userId
    };
    OrderMethods.orderHistory(obj).then(function (orderHistoryRes) {
        response.message = 'Order History fetched Successfully';
        if (orderHistoryRes && orderHistoryRes.length) {
            for (var orderIndex = 0; orderIndex < orderHistoryRes.length; orderIndex++) {
                if (orderHistoryRes[orderIndex]._doc && orderHistoryRes[orderIndex]._doc.productDetails) {;
                    orderHistoryRes[orderIndex]._doc.productDetails = JSON.parse(orderHistoryRes[orderIndex]._doc.productDetails);
                }
            }
        }
        response.content = orderHistoryRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unable to fetch Order History';
        response.content = err;
        res.json(response);
    });
};

exports.createOrder = function createUser(req, res) {
    var obj = req.body;
    if (obj.productDetails) {
        obj.productDetails = JSON.stringify(obj.productDetails);
    }
    obj = new Orders(obj);
    OrderMethods.createOrder(obj).then(function (createOrderRes) {
        response.message = 'Order Placed Successfully';
        response.content = createOrderRes;
        res.json(response);
    }).catch(function (err) {
        response.message = 'Unabe to Place Order';
        response.content = err;
        res.json(response);
    });
};