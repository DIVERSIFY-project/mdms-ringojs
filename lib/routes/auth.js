var response = require('ringo/jsgi/response');
var {Reinhardt} = require('reinhardt');
var strings = require('ringo/utils/strings');
var jedis = require('../jedis');
var ErrorBuilder = require('../ErrorBuilder');

var reinhardt = new Reinhardt({loader: module.resolve('../../templates/')});
var template = reinhardt.getTemplate('auth.html');

module.exports = function(req) {
  var login = req.postParams.login;
  var password = strings.digest(req.postParams.password, 'sha1').toUpperCase();

  if (login && password) {
    var result = jedis.get('user_' + login);
    if (result && result === password) {
      // user login/password are good
      var user = {
        login: login,
        password: result
      };
      // save user in session server-side
      req.session.data.user = user;
      // save sessionID in db with TTL 60*30 (30 minutes)
      var authID = strings.digest(login + 42 + result + new Date().getTime(), 'sha1') + '.authID';
      jedis.set(authID, login);
      jedis.expire(authID, 60 * 30);

      return response.addHeaders({
        "Set-Cookie": "AUTHID=" + authID
      }).html(template.render({
        title: "MdMS RingoJS",
        login: user.login
      }));
    } else {
      // wrong login/password
      var error = new ErrorBuilder({
        type: 'danger',
        message: 'Wrong login and/or password'
      });
      error.save(req.cookies['SESSID']);
      return response.redirect('/');
    }
  } else {
    return response.redirect('/');
  }
}
