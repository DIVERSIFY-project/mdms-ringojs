var response = require('ringo/jsgi/response')

exports.middleware = function authware(next, app) {
  
  var authMap = [];
  
  app.authware = function() {
    authMap = Array.slice(arguments);
  }
  
  return function(req) {
    if (doNeedAuth(req.pathInfo)) {
      if (req.session.data.user) {
        console.log('Authware valid: %s has auth for %s', req.session.data.user.login, req.pathInfo);
        return next(req);
      } else {
        console.log('Authware redirect: auth is needed to access %s', req.pathInfo);
        req.session.volatile = {
          type: 'warning',
          message: 'You are not allowed to access '+req.pathInfo+' resource'
        };
        return response.redirect('/');
      }
    } else {
      return next(req);
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
}