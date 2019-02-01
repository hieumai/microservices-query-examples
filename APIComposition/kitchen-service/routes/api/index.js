var router = require('express').Router();

router.use('/tickets', require('./tickets'));

module.exports = router;
