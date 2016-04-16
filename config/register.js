var crypto = require('crypto');
var rand = require('csprng');
var mongoose = require('mongoose');
var user = require('../config/models');


exports.register = function (email, password, callback) {

    var x = email;
    console.log("*** a");
    if (!(x.indexOf("@") = x.length)) {
        console.log("*** b");
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && password.length > 4 && password.match(/[0-9]/) && password.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
            console.log("*** c");
            var temp = rand(160, 36);
            var newpass = temp + password;
            var token = crypto.createHash('sha512').update(email + rand).digest("hex");
            var hashed_password = crypto.createHash('sha512').update(newpass).digest("hex");

            console.log("*** d");
            var newuser = new user({
                token: token,
                email: email,
                hashed_password: hashed_password,
                salt: temp
            });

            console.log("*** e");   
            user.find({ email: email }, function (err, users) {
console.log("*** f");
                var len = users.length;

                if (len == 0) {
                    newuser.save(function (err) {

                        callback({ 'response': "Sucessfully Registered" });

                    });
                } else {

                    callback({ 'response': "Email already Registered" });
                }
            });
        } else {

            callback({ 'response': "Password Weak" });

        }
    } else {

        callback({ 'response': "Email Not Valid" });
    }
}  