const express = require("express");
const router = express.Router();

const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/', isAuth, (req, res) => {
    res.render('index', {
        user : req.session.user,
        user_id : req.session.user_id
    })
})

module.exports = router;