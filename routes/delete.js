var response = require('ringo/jsgi/response');
var sqlite = require('ctlr-sqlite');

module.exports = function (req, id) {
  if (!isNaN(id)) {
    sqlite.connect('./mdms.db');
    sqlite.query('DELETE FROM article WHERE id='+id);
    sqlite.close();
    return response.redirect('/');
  }
}