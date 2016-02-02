var http = require('http');
 
http.createServer(function(request, response) {
  var url = request.url;
  var httpVersion = request.httpVersion;
  var method = request.method;
  var statusCode = request.statusCode;
  response.writeHead(200, {
    'Content-Type': 'text/html'
  });
  var content = '<html>\n' +
  '  <head>\n' +
  '    <title></title>\n' +
  '  </head>\n' +
  '  <body>\n' +
  '    URL: ' + url + '<br/>\n' +
  '    httpVersion: ' + httpVersion + '<br/>\n' +
  '    method: ' + method + '<br/>\n' +
  '    statusCode: ' + statusCode + '<br/>\n' +
  '  </body>\n' +
  '</html>';
  response.end(content);
}).listen(8080);
 
console.log('Server running at http://localhost:8080/');
