const express = require('express');
const router = express.Router();
const { checkLogin } = require("../controllers/signInController");

router.post('/login', checkLogin);

module.exports = router;