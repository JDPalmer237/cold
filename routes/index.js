const express = require("express");
// const session = require("express-session");
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

// Render Dashboard when user logs in
router.get('/', isAuth, async(req, res) => {

    // Read cold.json file and search for logged in user
    const data = fs.readFileSync("cold.json");
    const jsonData = JSON.parse(data);
    let user = jsonData.users.find((user) => user.id == req.session.user_id)

    // If user does not exist, create new user and write to JSON file
    if (!user) {
        user = {
            scenario_id: req.session.user_id,
            storyPathTaken: [jsonData.scenarios[0].scenarioText],
            currentScenario: jsonData.scenarios[0],
            keyItemsAcquired: []
        }
        jsonData.users.push(user)
        fs.writeFileSync('cold.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) throw err; 
            console.log("New data added");
        });
    }
    // Render index with users story path array and currentScenario object
    res.render('index', {
        userStoryPath: user.storyPathTaken,
        options: user.currentScenario.options,
    })
})

// Post request from index.ejs userInput
router.post('/', async(req, res) => {
    // Read cold.json
    const data = fs.readFileSync("cold.json");
    const jsonData = JSON.parse(data);
    let user = jsonData.users.find((user) => user.id == req.session.user_id)
    let scenario = user.currentScenario
    let chosenOption = scenario.options.find((option) => option.option_id == req.body.usersChosenOptionId)
    let nextScenario = jsonData.scenarios.find((scenario) => scenario.scenario_id == chosenOption.scenarioLink)

    console.log(nextScenario);

    // fs.writeFileSync('cold.json', JSON.stringify(jsonData, null, 2), (err) => {
    //     if (err) throw err; 
    //     console.log("New data added");
    // });

    res.redirect('/');
})

// // Returns an array of array strings for the users story path so far
// const userStoryPath = (user, scenarios) => {
//     return user.storyPathTaken.map((pathId) => {
//         let scenarioTaken = scenarios.find((scenario) => scenario.id == pathId);
//             return scenarioTaken.storyLine;
//         });
// }

router.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = router;