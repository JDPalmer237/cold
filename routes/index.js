const express = require("express");
const router = express.Router();
const fs = require('fs');

// Middleware to check user is logged in
const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/', isAuth, (req, res) => {
    // Open storyDB.json
    const data = fs.readFileSync("storyDB.json");
    const jsonData = JSON.parse(data);
    let userData = false;

    // Get users data
    if (jsonData.user[req.session.user_id]) {
        // found - load - return
        userData = true;
    }

    // If no user data. Create new user
    if(!userData) {
        jsonData.user[req.session.user_id] = {
            path: [],
            key_items: []
        }
        const jsonString = JSON.stringify(jsonData, null, 3);
        fs.writeFileSync('storyDB.json', jsonString);
    }

    // Go through users data
    req.session.story = jsonData.user[req.session.user_id].path

    // Render index with users data
    res.render('index', {
        story : req.session.story
    })
})

router.post('/', (req, res) => {
    // Open storyDB
    const data = fs.readFileSync("storyDB.json");
    const jsonData = JSON.parse(data);

    // Check users input against DB

    // Update user storyDB if progress is made
    jsonData.user[req.session.user_id].path.push(req.body.userInput);
        
    const jsonString = JSON.stringify(jsonData, null, 3);
    fs.writeFileSync('storyDB.json', jsonString);

    // Redirect to index
    res.redirect('/')
})

module.exports = router;