var http = require("http");
var port = process.env.PORT || 8000;
var redirect = require("./redirect.js");

var server = http.createServer(redirect);


server.listen(port, function(){
  console.log("Server is now on!");
})
