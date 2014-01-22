var response = require('ringo/jsgi/response');

module.exports = function signout(req) {
  req.session.data.user = null;
  req.session.volatile = {
    type: 'success',
    message: 'You are now signed out.'
  };
  return response.redirect('/');
}