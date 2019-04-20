
var code = 200;

var response = {
    responseData: {},
    get data(){
        return this.responseData
    },
    set data(AValue){
        this.responseData = AValue;
    } 
};

var responseHeaders = {};

function status( codeStatus){
    code = codeStatus;
}

function header( key, value){
    responseHeaders[key] = value;
}

function json(data = {}){
    response = data;
    return data;
}

function getResponseCode(){
    return code;
}

function getResponseBody(){
    return response;
}

function getResponseHeaders(){
    return responseHeaders;
}

function send(){
}

module.exports = {
    json,
    header,
    status,
    getResponseCode,
    getResponseBody,
    getResponseHeaders,
    send
}
