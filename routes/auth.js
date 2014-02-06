var response = require('ringo/jsgi/response');
var strings = require('ringo/utils/strings');
var jedis = require('../jedis');

module.exports = function (req) {
    var login = req.postParams.login;
    var password = strings.digest(req.postParams.password, 'sha1').toUpperCase();
    if (login && password) {
        var result = jedis.get('user_'+login);
        if (result) {
            var user = { login: login, password: result };
            req.session.data.user = user;
            req.session.volatile = {
                type: 'success',
                message: 'Hi '+user.login+'! You are now signed in'
            };
            return response.redirect('/');
        } else {
            req.session.volatile = {
                type: 'danger',
                message: 'Wrong login and/or password'
            };
            return response.redirect('/');
        }
    } else {
        return response.redirect('/');
    }
}