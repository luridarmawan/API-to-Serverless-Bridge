
let code = 200;
let responseHeaders = {};

let response = {
  responseData: {},
  get data() {
    return this.responseData;
  },
  set data(AValue) {
    this.responseData = AValue;
  }
};


function status(codeStatus) {
  code = codeStatus;
}

function header(key, value) {
  responseHeaders[key] = value;
}
function set(key, value) {
  header(key, value)
}

function type(value) {
  header('Content-Type', value)
}

function json(data = {}) {
  response = data;
  return data;
}

function getResponseCode() {
  return code;
}

function getResponseBody() {
  return response;
}

function getResponseHeaders() {
  return responseHeaders;
}

function send() {
  // TODO: create send function
}

module.exports = {
  json,
  header,
  set, // same with header
  type, // Content-Type header
  status,
  getResponseCode,
  getResponseBody,
  getResponseHeaders,
  send
};
