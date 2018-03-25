const express = require('express');
const router = express.Router();

const adrressCodeController = require('../controller/addressCode');

router.get('/il', adrressCodeController.getIl);

router.get('/ilce/:id', adrressCodeController.getIlce);

router.get('/bucakKoy/:id', adrressCodeController.getBucakKoy);

router.get('/mahalle/:id', adrressCodeController.getMahalle);

router.get('/sokak/:id', adrressCodeController.getSokak);

router.get('/bina/:id', adrressCodeController.getBina);

router.get('/daire/:id', adrressCodeController.getDaire);


module.exports = router;


