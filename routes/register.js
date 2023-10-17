const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();

router.get('/', (req, res) => {
    res.render('register');
})

router.post('/', (req, res) => {

    // Check users input
    username = req.body.username;
    if (username.length < 3) {
        console.log('User input invalid')
        return res.send("Username too short")
    }
    if (req.body.password.length <= 8 || req.body.password != req.body.confirmPassword) {
        console.log('User input invalid')
        return res.send("Please input password correctly")
    }

    // Open database
    const db = new sqlite3.Database('./cold.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
            return res.send("Failed to connect to database")
        }
        console.log('DB connected in register.js...')
    });

    // Check DB for existing username
    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
        if (err) {
            return console.error(err)
        }
        if (row) {
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Username already exists\nDatabase connection closed.');
            });
            return res.send("Username already exists")
        } else {
            // If username doesn't exist - hash password and add user to DB
            bcrypt.hash(req.body.password, 10).then(function(hash){

                db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (function (err) {
                    if (err) {
                        console.error(err.message);
                        return res.send("Failed to log user")
                    }
                    console.log("Inserted user into db")
                    return res.send("User registered")
                }))
            
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log('Database connection closed.');
                });
            })
        }
    })
});
    

// router.get('/new', (req, res) => {
//     res.render('new', { text: 'new' });
// })

module.exports = router;