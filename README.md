mdms-ringojs
============

Markdown CMS using RingoJS server-side and @jbt markdown-editor client-side

## Setup your env
### Install Ringo's package manager:
First of all, install RingoJS packages manager (equivalent to `npm` but for RingoJS):
```sh
ringo-admin install grob/rp
```

### Install MdMS dependencies:
Then install all the dependencies MdMS needs.  
To do so, use RingoJS's packages manager `rp` that you just installed:
```sh
cd /path/to/mdms
rp install
```

### Run a Redis database (using docker):
Now **MdMS** needs a *redis* db in order to run.  
You can easily start one using [Docker](https://hub.docker.com/_/redis/).
```sh
docker run -p 6379:6379 -d redis:alpine
```
> The database configuration is available in `/path/to/mdms/config.json`

## Start MdMS
```sh
ringo server.js --port=9090 mdmsInstanceName
```
*The `mdmsInstanceName` is used by the WebSocket client as an ID*  

You can now open your browser and go to [localhost:9090](http://localhost:8080)

> NB: if you want to add some dummy data to the DB you can run `ringo tool/fakedb.js`
