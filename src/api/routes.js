const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.post('/proof', handlers.generateProof);
router.post('/verify', handlers.verifyProof);
router.post('/login', handlers.login);
router.get('/secure-data', handlers.secureEndpoint);

module.exports = router;
