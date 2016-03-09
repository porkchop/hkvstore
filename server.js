var app = require('./app');
var http = require('http');
var server = http.createServer(app);
server.listen(3000, () => {
  console.log('hkvstore server listening on port ' + server.address().port);
});
