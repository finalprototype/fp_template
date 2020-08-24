const express = require('express');
const mainRoute = require('./main');

const router = new express.Router();

router.get('*', mainRoute);

module.exports = router;
