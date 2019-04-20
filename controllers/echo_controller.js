require('dotenv').config();
const config = require('../config/config').Config;
const environment = config.environment;
const Config = config[environment];

function echoGet(req,res,next){
    console.log("ECHO: Get");
    let echoID = (typeof req.params.id === 'undefined') ? '' : req.params.id;
    res.header("x-header", "header content #1");
    return res.json({status: 200, msg: 'echo', name: Config.system.name, id: echoID, query: req.query});
}

function echoPost(req,res,next){
    console.log("ECHO: Post");
    json = req.body;
    res.header("x-header", "header content #2");
    return res.json({status: 200, msg: 'echo', query: req.query, data: json});
}

module.exports = {
    echoGet,
    echoPost,
}
