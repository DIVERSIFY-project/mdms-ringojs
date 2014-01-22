var response = require('ringo/jsgi/response');
var strings = require('ringo/utils/strings');
var sqlite = require('ctlr-sqlite');

module.exports = function (req) {
  var login = req.postParams.login;
  var password = strings.digest(req.postParams.password, 'sha1').toUpperCase();
  if (login && password) {
    sqlite.connect('./mdms.db');
    var result = sqlite.prepared_query("SELECT * FROM user WHERE login = ? AND password = ?", [login, password]);
    var user = sqlite.get_row(result);
    sqlite.close();
    if (user.login === login && user.password === password) {
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