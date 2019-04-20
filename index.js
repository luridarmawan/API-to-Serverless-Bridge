var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var mysql = require('mysql');
 
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// parse application/json
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.multipart());

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, vizi-token");
  next()
});

const test = require('./routes/test/test_router');

app.use('/test', test);

app.get('/',(req, res) => {
    let results = {
        var: 'value'
    }
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    console.log(results);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found URL');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.send(err);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
  ? 'pipe ' + addr
  : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
  
// Socket Server 
io.on('connection', function(socket){
  console.log('an user connected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
io.sockets.on('connection', function (socket) {
  console.log('socket server started')
});

var message = io
  .of('/message')
  .on('connection', function (socket) {
    socket.emit('the_message', { message: 'this is message from server' });
  });


// Server App listening
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
