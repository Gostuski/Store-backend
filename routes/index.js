const express = require('express');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.get('/', (req, res) => {
    res.send('Welcome');
})
router.get('/homepage', ensureAuthenticated, (req, res) => {
    res.send('homepage');
})


module.exports = router;