var fs = require("fs");
var path = require("path");
var namesData = require('./names.json');
var url = require('url');
var queryString = require('querystring')
var serverLogic = require("./logic.js")
//console.log(namesData)
var handlers = {
  indexHandler: function(request, response) {
    var endpoint = request.url;
    if (endpoint === "/" || endpoint === "/index.html") {
      var filePath = path.join(__dirname, '..', 'index.html')
      fs.readFile(filePath, function(error, file) {
        if (error) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.end('server error');
        }
        response.writeHead(200, 'Content-Type: text/html');
        response.end(file);
      });
    }
  },
  staticFileHandler: function(request, response, endpoint) {
    var extensionType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon',
      json: 'application/json'
    };

    var extension = endpoint.split('.')[1];
    var filePath = path.join(__dirname, '..', endpoint);

    fs.readFile(filePath, function(error, file) {
      if (error) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.end('SERVER ERROR');
      } else {
        response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
        response.end(file);
      }
    });
  },
  autoComplete: function(request, response){
    var text = request.url;
    var parsed = queryString.parse(text);
    var inputs = parsed['/autoSearch'];
    var result = serverLogic.search(inputs, namesData);
    console.log("auto-result = " + JSON.stringify(result))
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(result));
  },
  nameMeaning: function(request, response){
    var text = request.url;
    var parsed = queryString.parse(text);
    var nameSearched = parsed['/name-meaning'];
    var result = serverLogic.searchedMeaning(nameSearched, namesData)
    console.log("meaning = " + JSON.stringify(result))
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(result));
  }
}

module.exports = handlers;
