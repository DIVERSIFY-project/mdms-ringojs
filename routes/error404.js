var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');

exports.error404 = function (req) {
  var template = getResource("./../templates/404.html").content;
  var res = response.setStatus(404);
  return res.html(
    mustache.to_html(
      template,
      { path: req.pathInfo.substr(1) })
  );
};