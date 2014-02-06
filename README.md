mdms-ringojs
============

Markdown CMS using RingoJS server-side and @jbt markdown-editor client-side

## Usage
```sh
ringo-admin install ringo/stick
ringo tools/fakedb.js
ringo main.js
```

`ringo tools/fakedb.js` loads some fake articles into the database for you =)  
`ringo main.js` starts the server on port `8080`

> You will also **need a Redis server** up and running.  
> Connection informations can be found in `config.json`

You can now open your browser and go to [localhost:8080](http://localhost:8080)
