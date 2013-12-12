mdms-ringojs
============

Markdown CMS using RingoJS server-side and @jbt markdown-editor client-side

## Usage
```sh
ringo-admin install emilis/ctlr-sqlite
# then you need to move the jar from packages/ctlr-sqlite/jars to lib/
# (in $RINGO_HOME, default is /usr/share/ringojs/)
ringo initdb.js
ringo fakedb.js
ringo main.js
```

`ringo initdb.js` creates a new SQLite database called `mdms.db` in the project root directory and create a new table called `article`
`ringo fakedb.js` loads some fake articles into the database for you =)
`ringo main.js` starts the server on port `8080`

You can now open your browser and go to [localhost:8080](http://localhost:8080)
