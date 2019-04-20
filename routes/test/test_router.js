/*
  [*] Manual Test
  curl http://localhost:3000/test/test

  curl http://localhost:3000/test/echo?var1=value1

  curl -X POST http://localhost:3000/test/echo?var1=value1 -d '{"satu":"dua"}'


*/


const router = require('express-promise-router')()
const controller = require('../../controllers');

// ex 1
router.route('/test').get(
  (req,res,next)=>{
    controller.echoController.echoGet(req,res);
  }
)

// ex 2
router.get('/echo',(req, res) => {
  controller.echoController.echoGet(req,res);
});

// ex 3
router.get('/echo/:id',(req, res) => {
  controller.echoController.echoGet(req,res);
});

// ex 4
router.post('/echo',(req, res) => {
  controller.echoController.echoPost(req,res);
});

router.get('/promise',(req, res) => {
  controller.promiseController.promiseGet(req, res);
});

module.exports = router
