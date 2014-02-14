var jedis = require('../jedis');

/**
 * Created with IntelliJ IDEA.
 * User: leiko
 * Date: 14/02/14
 * Time: 11:08
 */
var ErrorBuilder = function (obj) {
    this.obj = obj;
}

ErrorBuilder.prototype.save = function (id) {
    var map = Packages.java.util.HashMap();
    for (var key in this.obj) {
        map.put(key, this.obj[key]);
    }
    jedis.hmset('error_'+id, map);
    jedis.expire('error_'+id, 60*15);
}

module.exports = ErrorBuilder;
