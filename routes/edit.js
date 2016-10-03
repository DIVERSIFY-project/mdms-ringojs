var response = require('ringo/jsgi/response');
var { Reinhardt } = require('reinhardt');
var jedis = require('../jedis');
var ErrorBuilder = require('../lib/ErrorBuilder');

var reinhardt = new Reinhardt({
  loader: module.resolve('../templates/')
});

module.exports = function (req, id) {
    if (jedis.exists(id)) {
        var artList = jedis.hmget(id, 'title', 'content');
        var article = {
            id: id,
            title: artList.get(0),
            content: artList.get(1)
        };

        if (article) {
            article.date = new Date(article.date).toUTCString();
            return reinhardt.renderResponse('edit.html', {
              title: "MdMS RingoJS",
              article: article
            });
        } else {
            return response.redirect('index');
        }

    } else {
        var error = new ErrorBuilder({
            type: 'warning',
            message: 'Article "'+id+'" does not exist'
        });
        error.save(req.cookies['SESSID']);
        return response.redirect('/');
    }
};
