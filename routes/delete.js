var response = require('ringo/jsgi/response');
var sqlite = require('ctlr-sqlite');
sqlite.connect('./mdms.db');

module.exports = function (req) {
  var id = req.env.servletRequest.getParameter('id');
  sqlite.query('DELETE FROM article WHERE id='+id);
  return response.redirect('index');
}