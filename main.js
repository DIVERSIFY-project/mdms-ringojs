#!/usr/bin/env ringo

var routes = require("./routes.js");
var response = require("ringo/jsgi/response");

// Minimalistic request dispatcher in lieu of a proper framework
exports.app = function(request) {
  var path = request.pathInfo.slice(1) || "index";
  // 1. resolve against routes
  if (routes[path] && typeof routes[path][path] === "function") {
    return routes[path][path](request);
  }
  // 2. resolve against public folder
  var resource = getResource("./public/" + path);
  if (resource.exists()) {
    return response.static(resource);
  }
  // 3. return 404 response
  return routes['error404']['error404'](request);
}

// main script to start application
if (require.main == module) {
  require("ringo/httpserver").main(module.id);
}
