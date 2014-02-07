var response = require('ringo/jsgi/response');
var jedis = require('../jedis');

module.exports = function signout(req) {
    req.session.data.user = null;
    req.session.volatile = {
        type: 'success',
        message: 'You are now signed out.'
    };
    jedis['del(java.lang.String[])'](req.cookies['SESSID']);
    return response.redirect('/');
}