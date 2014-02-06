var jedis = require('../jedis');
var strings = require('ringo/utils/strings');

var map0 = Packages.java.util.HashMap();
var date = new Date();
var id0 = strings.digest(date.getTime().toString(), 'sha1');
map0.put('title', 'Article 1');
map0.put('content', '__foo__  \nbar  \n[Google.fr](http://google.fr)');
jedis.hmset(id0, map0);

var map1 = Packages.java.util.HashMap();
date = new Date();
var id1 = strings.digest(date.getTime().toString(), 'sha1');
map1.put('title', 'Article 2');
map1.put('content', '*potato* lorem ipsum dolor\n\n  * sit\n  * amet');
jedis.hmset(id1, map1);

var map2 = Packages.java.util.HashMap();
date = new Date();
var id2 = strings.digest(date.getTime().toString(), 'sha1');
map2.put('title', 'Article 3');
map2.put('content', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus ut elit gravida eleifend. Cras id diam nec sem pretium eleifend. Praesent rutrum rutrum porttitor. Etiam commodo vel risus et dapibus. Cras id scelerisque tellus, non auctor sem. Quisque et urna bibendum, condimentum dolor et, condimentum neque. Vivamus iaculis massa faucibus scelerisque mollis. Fusce lacinia nisl velit, quis rutrum velit suscipit facilisis. Suspendisse ultrices dignissim libero, lobortis dictum tellus suscipit scelerisque.');
jedis.hmset(id2, map2);

jedis.sadd('articles', id0, id1, id2);

// fake user values
jedis.set('user_admin', 'D033E22AE348AEB5660FC2140AEC35850C4DA997');