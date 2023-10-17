const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    res.send("login POST todo")
})

module.exports = router;