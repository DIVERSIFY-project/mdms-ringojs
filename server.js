#!/usr/bin/env ringo
var system = require('system');
var port = system.args[1].substr(7); // get rid of --port= in the command-line arg
var id = system.args[2];
var ringoSosie = system.args[3];

addToClasspath(module.resolve('./jars/websocket-client-1.0.1.jar'));

function sendData(ws) {
  var data = { functions: {} };
  Packages.fr.inria.diversify.demo.logger.Logger.counts.keySet()
    .forEach({ accept: function (key) {
      data.functions[key] = Packages.fr.inria.diversify.demo.logger.Logger.counts.get(key);
    }})
  ws.send(JSON.stringify({ type: 'DATA', data: data }));
}

var uri = new java.net.URI('ws://localhost:9050');
var handlers = {
  onOpen: function () {
    ws.send(JSON.stringify({
      type: 'REGISTER',
      id: id,
      port: port,
      ringo: ringoSosie
    }));
    setTimeout(function () {
      sendData(ws);
    }, 500);
  },
  onMessage: function (msg) {
    var action;
    try {
      action = JSON.parse(msg);
      switch (action.type) {
        case 'DATA':
          sendData(ws);
          break;
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.log('Incoming message is not a valid JSON message');
      } else {
        throw err;
      }
    }
  },
  onClose: function (code, reason) {
    console.log('WebSocket connection close', code, reason);
  },
  onError: function (err) {}
};
var ws = new Packages.fr.braindead.websocket.client.SimpleWebSocketClient(uri, handlers);

// main script to start application
if (require.main === module) {
  require("ringo/httpserver").main(module.resolve('./lib/main'));
}
