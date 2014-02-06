var jedis = require('../jedis');

// fake article values
jedis.hmset('articles',
    'title', 'Article 1',
    'content', '__foo__  \nbar  \n[Google.fr](http://google.fr)',
    'date', new Date().toString()
);
jedis.hmset('articles',
    'title', 'Article 2',
    '*potato* lorem ipsum dolor\n\n  * sit\n  * amet',
    'date', new Date().toString()
);
jedis.hmset('articles',
    'title', 'Article 1',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus ut elit gravida eleifend. Cras id diam nec sem pretium eleifend. Praesent rutrum rutrum porttitor. Etiam commodo vel risus et dapibus. Cras id scelerisque tellus, non auctor sem. Quisque et urna bibendum, condimentum dolor et, condimentum neque. Vivamus iaculis massa faucibus scelerisque mollis. Fusce lacinia nisl velit, quis rutrum velit suscipit facilisis. Suspendisse ultrices dignissim libero, lobortis dictum tellus suscipit scelerisque.',
    'date', new Date().toString()
);

// fake user values
jedis.set('admin', 'D033E22AE348AEB5660FC2140AEC35850C4DA997'); // login: admin, password: admin