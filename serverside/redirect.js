var handlers = require("./handler.js");

function redirect(request, response){
  var endpoint = request.url;
  if(endpoint === "/"){
    handlers.indexHandler(request, response)
  } else if (endpoint.indexOf('/public') !== -1) {
    handlers.staticFileHandler(request, response, endpoint);
  } else if (endpoint.indexOf('/autoSearch') !== -1) {
    handlers.autoComplete(request, response)
  }else if (endpoint.indexOf('/name-meaning') !== -1) {
    handlers.nameMeaning(request, response)
  }else{
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.end("Error")
  }
}

module.exports = redirect;
