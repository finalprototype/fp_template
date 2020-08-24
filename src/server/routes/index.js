const express = require('express');
const apiRoutes = require('./api');
const viewRoutes = require('./views');

const router = new express.Router();

router.use('/api', apiRoutes);
router.use(viewRoutes);

module.exports = router;
