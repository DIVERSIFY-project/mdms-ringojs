var response = require('ringo/jsgi/response');
var jedis = require('../jedis');
var ErrorBuilder = require('../ErrorBuilder');

exports.middleware = function authware(next, app) {

    var authMap = [];

    app.authware = function() {
        authMap = Array.slice(arguments);
    }

    return function(req) {
        if (isConnected(req)) {
            console.log('Authware valid: %s has auth for %s', req.session.data.user.login, req.pathInfo);
            return next(req);
        } else {
            if (doNeedAuth(req.pathInfo)) {
                console.log('Authware redirect: auth is needed to access %s', req.pathInfo);
                var error = new ErrorBuilder({
                    type: 'warning',
                    message: 'You are not allowed to access '+req.pathInfo+' resource'
                });
                error.save(req.cookies['SESSID']);
                return response.redirect('/');
            } else {
                return next(req);
            }
        }
    }

    function doNeedAuth(path) {
        for (var i in authMap) {
            if (path.slice(0, authMap[i].length) === authMap[i]) {
                return true;
            }
        }
        return false;
    }

    function isConnected(req) {
        var authID = req.cookies['AUTHID'];
        if (authID && jedis.exists(authID)) {
            req.session.data.user = { login: jedis.get(authID) };
            return true;
        } else {
            req.session.data.user = null;
        }

        return false;
    }
}
