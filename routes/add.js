var mustache = require('ringo/mustache');
var response = require('ringo/jsgi/response');

exports.add = function (req) {
  var template = getResource("./../templates/add.html").content;
  return response.html(
    mustache.to_html(template, {
      title: "MdMS RingoJS"
    })
  );
}