var response = require('ringo/jsgi/response');
var jedis = require('../jedis');
var ErrorBuilder = require('../lib/ErrorBuilder');

module.exports = function signout(req) {
    req.session.data.user = null;
    var error = new ErrorBuilder({
        type: 'success',
        message: 'You are now signed out.'
    });
    error.save(req.cookies['SESSID']);
    jedis['del(java.lang.String[])'](req.cookies['AUTHID']);
    return response.redirect('/');
}