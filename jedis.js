var config = require('./config.json');

addToClasspath(module.resolve("./jars/jedis.jar"));
var Jedis = Packages.redis.clients.jedis.Jedis;

module.exports = Jedis(config['redis-server'], config['redis-port']);