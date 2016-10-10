var jedis = require('../lib/jedis');

var map0 = Packages.java.util.HashMap();
var id0 = 'article_0';
map0.put('title', 'Software Diversity');
map0.put('content', 'As part of our project, we synthesize and observe multiple forms of software diversity. For example, we have vizualized the diversity in commit flows among projects hosted in [Github](https://github.com/) using [circos](http://circos.ca/).\n![commits diversity](https://raw.github.com/bbaudry/GitWorks/master/images/ace.png "Diversity in the commit flow in Github")');
jedis.hmset(id0, map0);

var map1 = Packages.java.util.HashMap();
var id1 = 'article_1';
map1.put('title', 'Diversify Video');
map1.put('content', 'This Video demonstrate the MDMS use case for the [DIVERSIFY project](http://diversify-project.eu/).\n\nThe goal is to showcase that using automatically diversified source code in various environments does not impact the **external visible behavior** of the system.');
jedis.hmset(id1, map1);

var map2 = Packages.java.util.HashMap();
var id2 = 'article_2';
map2.put('title', 'Experimental app');
map2.put('content', 'This editor of MD posts is developed in the context of the [DIVERSIFY project](http://diversify-project.eu/), which explores the synthetic diversification of web servers.');
jedis.hmset(id2, map2);

jedis.sadd('articles', id0, id1, id2);

// fake user values
jedis.set('user_admin', 'D033E22AE348AEB5660FC2140AEC35850C4DA997');
