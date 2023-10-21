const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {

    const username = req.body.username;

    // If no user input
    if (!username || !req.body.password) {
        return res.render("message", { message: "Please provide a valid username.", subMessage: "", redirect: "login" });
    }
    // Open DB
    const db = new sqlite3.Database('./cold.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });

    // Check for username and password
    db.get("SELECT * FROM users WHERE username = ?", username, function(err, row) {
        if (err) return console.error(err.message);
        // If user doesn't exist
        if (!row) return res.render("message", { message: "Please provide a valid username.", subMessage: "", redirect: "login" });

        bcrypt.compare(req.body.password, row.password, function(err, result) {
            if (err) {
                console.error("Bcrypt failed to compare password hash");
                return res.send("Internal error");
            }
            if (result) {
                req.session.user = username;
                req.session.user_id = row.id;
                req.session.isAuth = true;
                return res.redirect('/');
            } else {
                return res.render("message", { message: "Incorrect password.", subMessage: "", redirect: "login" });
            }
        });
    });

    db.close((err) => {
        if (err) return console.error(err.message);
    });
});

module.exports = router;