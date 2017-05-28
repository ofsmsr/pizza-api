var q = require('q'),
    db = require('./mongoosedb');

var UserSchema = new db.Schema({
    emailId: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
    },
    mobile: {
        type: String,
    }
},{
    collection: 'users'
});

var Users = {};

UserSchema.methods.login = function login(obj) {
    var deferred = q.defer();
    try {
        Users.findOne({ 'emailId': obj.emailId }, function (err, loginRes) {
            if (err) deferred.reject(err);
            if (loginRes) {
                if (loginRes.password === obj.password) {
                    deferred.resolve(loginRes);                    
                } else {
                    deferred.reject(null);
                }
            } else {
                deferred.reject(loginRes);
            }
        });
        return deferred.promise;
    }
    catch (loginException) {
        deferred.reject(loginException);
        console.log(loginException);
    }
};

UserSchema.methods.registration = function registration(obj) {
    var deferred = q.defer();
    try {
        obj.save(function (err, registrationRes) {
            if (err) deferred.reject(err);
            deferred.resolve(registrationRes);
        });
        return deferred.promise;
    }
    catch (registrationException) {
        deferred.reject(registrationException);
        console.log(registrationException);
    }
};

Users = db.model('Users', UserSchema);
module.exports = Users;