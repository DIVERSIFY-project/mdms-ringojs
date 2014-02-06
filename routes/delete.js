var response = require('ringo/jsgi/response');
var jedis = require('../jedis');

module.exports = function (req, id) {
  if (!isNaN(id)) {
    sqlite.query('DELETE FROM article WHERE id='+id);
    return response.redirect('/');
  }
}