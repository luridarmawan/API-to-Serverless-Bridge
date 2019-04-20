require('dotenv').config();


function someFunction(resolve,reject){
    console.log('promise function');
    //throw '>> trigger error'; //unmark to test error
    resolve('Success');
}

function promiseGet(req,res,next){
    console.log("Test Promise");
    var p1 = new Promise(someFunction)
    .then((values) => {
        console.log('...then');
        return res.json({status: 202, msg: 'promise done'});
    })
    .catch(err => {
        console.log('...catch');
        console.log(err);
        return res.json({status: 500, msg: 'catch'});
    });
}

module.exports = {
    promiseGet,
}
