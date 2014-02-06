var jedis = require('../jedis.js');

jedis.sadd('article', 'foo', 'bar', 'baz');
var articles = jedis.smembers('article');
console.log(articles);