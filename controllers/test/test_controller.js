require('dotenv').config();

module.exports = {
    echoData2:(req,res,next)=>{
        return res.json({ok: true, error: null, msg: 'echo', query: req.query});
    }  
}
