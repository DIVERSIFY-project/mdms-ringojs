var { Reinhardt } = require('reinhardt');
var response = require('ringo/jsgi/response');

var reinhardt = new Reinhardt({
  loader: module.resolve('../../templates/')
});

module.exports = function (req) {
  return reinhardt.renderResponse('add.html', {
    title: "MdMS RingoJS",
  });
}
