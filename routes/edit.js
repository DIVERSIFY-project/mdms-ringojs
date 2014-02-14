var response = require('ringo/jsgi/response');
var mustache = require('ringo/mustache');
var jedis = require('../jedis');
var ErrorBuilder = require('../lib/ErrorBuilder');

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
        var error = new ErrorBuilder({
            type: 'warning',
            message: 'Article "'+id+'" does not exist'
        });
        error.save(req.cookies['JSESSIONID']);
        return response.redirect('/');
    }
};