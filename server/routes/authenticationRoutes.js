const express = require('express');
const router = express.Router();
const { checkAuth, extractDataFromDB } = require("../controllers/authenticationController");

router.use(checkAuth);

router.post('/authenticate', extractDataFromDB);


module.exports = router;


