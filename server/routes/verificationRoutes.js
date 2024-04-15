const express = require('express');
const router = express.Router();
const { handleVerification, checkCode } = require("../controllers/verificationController");

router.post('/handle-verification', handleVerification);
router.post('/check-code', checkCode);

module.exports = router;