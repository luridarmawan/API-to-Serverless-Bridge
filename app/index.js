import express from 'express';
import path from 'path';
import socketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../config/swagger.json';

import configJson from '../config/config';
import routes from './routes';

const environment = configJson.environment;
const Config = configJson[environment];


const app = express();
const port = normalizePort(process.env.PORT || '3000');

// parse application/json
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
// app.use(express.multipart());

app.use(cors());
app.options('*', cors());

// Our Echo test
app.use('/test', routes);

// swagger documentation
app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument));

// default route
app.get('/', (req, res) => res.status(200).send({ status: 200, message: 'Welcome to API-to-Serverless Bridge.' }));

app.use((req, res) => {
  res.status(404).send({ status: 404, message: 'Not Found URL' });
});

// Socket Server
if (Config.socket.enable) {
  console.log('Socket server enabled');

  // TODO: socket code
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  return false;
}

function onError(error) {
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  console.log(`Server is running on PORT ${port}`);
}

app.listen(port)
  .on('error', onError)
  .on('listening', onListening);

export default app;
