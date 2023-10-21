const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    res.render('register');
})

router.post('/', (req, res) => {
    
    username = req.body.username;
    // Check username
    if (username.length < 4) {
        return res.render("message", { message: "Username too short!", subMessage: "Please provide a username between 4-16 characters.", redirect: "register" });
    }
    // Check Password
    if (req.body.password.length <= 8 || req.body.password.length >= 16 || req.body.password != req.body.confirmPassword) {
        return res.render("message", { message: "Password error", subMessage: "Please provide a password between 8-16 characters.", redirect: "register"});
    }
    if (req.body.password != req.body.confirmPassword) {
        return res.render("message", { message: "Password error", subMessage: "Please make sure your passwords match.", redirect: "register" });
    }

    // Open DB
    const db = new sqlite3.Database('./cold.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });
    // Check DB for existing username
    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
        if (err) return console.error(err)
        if (row) {
            db.close((err) => {
                if (err) return console.error(err.message);
            });
            return res.render("message", { message: "Username already exists", subMessage: "Please provide a different username.", redirect: "register" });
        } else {
            // If username doesn't exist - hash password and add user to DB
            bcrypt.hash(req.body.password, 10).then(function(hash){
                db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (function (err) {
                    if (err) return console.error(err.message);
                    return res.render("message", { message: "Congratulations", subMessage: "You are now registered. Please log in.", redirect: "login" });
                }));
            
                db.close((err) => {
                    if (err) return console.error(err.message);   
                });
            })
        }
    })
});

module.exports = router;