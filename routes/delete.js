var response = require('ringo/jsgi/response');
var jedis = require('../jedis');
var ErrorBuilder = require('../lib/ErrorBuilder');

module.exports = function (req, id) {
    if (jedis.exists(id)) {
        var error = new ErrorBuilder({
            type: 'success',
            message: 'Article "'+id+'" deleted successfully'
        });
        error.save(req.cookies['JSESSIONID']);
        
        jedis.srem('articles', id);
        jedis['del(java.lang.String[])'](id);
        
    } else {
        var error = new ErrorBuilder({
            type: 'warning',
            message: 'Article "'+id+'" does not exist (can\'t delete something that does not exist :O)'
        });
        error.save(req.cookies['JSESSIONID']);
    }

    return response.redirect('/');
}