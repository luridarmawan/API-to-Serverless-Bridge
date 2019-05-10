/*
  [x] How to local test, using serverless
  serverless invoke local -f echoBridge

  [x] local test, with serverless offline
  serverless offline start

  [x] local test, with services/nodemon
  run:
    nodemon index.js

  test:
    curl "http://localhost:3000/test/echo?var1=value1&var2=value2"

  [x] local test, dummy test
  node lambda_handler.js

*/
'use strict';

const DEBUG_LOCAL = false;

// const fs = require('fs');
const echoController = require('./app/controllers/EchoController');
const res = require('./utils/response_handler');

module.exports.echoBridge = async (event, context, callback) => {
  const requestHeaders = event['headers'] == undefined ? '' : event['headers'];
  const httpMethod = event['httpMethod'] == undefined ? 'function' : event['httpMethod'];
  const requestParams = event['pathParameters'] == undefined ? {} : event['pathParameters'];
  const requestQuery = event['queryStringParameters'] == undefined ? {} : event['queryStringParameters'];
  const requestQueryAsString = generateQueryString(requestQuery);
  let requestBody = event['body'] == undefined ? {} : event['body'];
  let responseBody = {};
  let responseHeaders = {};
  const request = {
    method: httpMethod,
    headers: requestHeaders,
    query: requestQuery,
    queryAsString: requestQueryAsString,
    params: requestParams,
  };

  try {
    requestBody = JSON.parse(requestBody);
    request.body = requestBody;
  } catch (e) {
    //
  }

  // ----- manual echo
  responseBody = {
    statusCode: 202,
    message: 'ECHO Function',
    method: httpMethod,
    headers: requestHeaders,
    params: requestParams,
    query: requestQuery,
    queryAsString: requestQueryAsString,
    body: requestBody,
    // input: event,
  };

  // ------- YOUR CODE HERE
  if (httpMethod === 'GET') {
    echoController.echoGet(request, res);
  }
  /*
  if (httpMethod == 'POST'){
    controller.echoController.echoPost(request, res);
  }
  if (httpMethod == 'OPTIONS'){
    res.status(204);
  }
  
  
  // header and body wrapper from existing api controller
  responseBody = res.getResponseBody();
  responseHeaders = res.getResponseHeaders();
  */
  // ------- YOUR CODE - END
  if (DEBUG_LOCAL) {
    callback(null, responseBody);
  }

  responseHeaders['x-build-with'] = 'fastplaz';
  return {
    statusCode: res.getResponseCode(),
    headers: responseHeaders,
    body: JSON.stringify(responseBody),
  };
};

function generateQueryString(AQuery) {
  let s = '';
  for (var item in AQuery) {
    s += item + '=' + AQuery[item] + '&';
  }
  s = s.substring(0, s.length - 1);
  return s;
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function isNumeric(s) {
  // return (typeof s == "number" && !isNaN(s));
  const n = parseInt(s);
  if (s === n) {
    return true;
  }
}

function callbackFunction(par1, AResponse) {
  console.log(AResponse);
}

// local debug only
if (DEBUG_LOCAL) {
  console.log('LOCAL DEBUG');
  // let s = fs.readFileSync('template/post.json', { encoding: 'utf8' });
  const event = {
    httpMethod: 'GET',
    queryStringParameters: {
      var1: 'value 1'
    }
  };
  module.exports.echoBridge(event, '', callbackFunction);
}
