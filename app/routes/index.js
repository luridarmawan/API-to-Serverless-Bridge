/*

  [*] Manual Test
  curl http://localhost:3000/test/test

  curl http://localhost:3000/test/echo?var1=value1

  curl -X POST http://localhost:3000/test/echo?var1=value1 -d '{"satu":"dua"}'

*/

import { Router } from 'express';
import EchoController from '../controllers/EchoController';

const router = Router();

router.get('/echo', EchoController.echoGet);
router.get('/echo/:id', EchoController.echoGet);
router.post('/echo', EchoController.echoPost);

export default router;
