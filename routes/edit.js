var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var jedis = require('../jedis');

module.exports = function (req, id) {
    var template = getResource("./../templates/edit.html").content;

    if (jedis.exists(id)) {
        var artList = jedis.hmget(id, 'title', 'content');
        var article = {
            id: id,
            title: artList.get(0),
            content: artList.get(1)
        };

        if (article) {
            article.date = new Date(article.date).toUTCString();
            return response.html(
                mustache.to_html(template, {
                    title: "MdMS RingoJS",
                    article: article
                })
            );
        } else {
            return response.redirect('index');
        }

    } else {
        req.session.volatile = {
            type: 'warning',
            message: 'Article "'+id+'" does not exist'
        };
        return response.redirect('/');
    }
};