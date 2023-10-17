const express = require('express');
const app = express();
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Connect to DB
const db = new sqlite3.Database('./cold.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("DB connected in server.js...")
});
// Check table exists. If not create one in cold.db
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL)");
// Close connection to DB
db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection on server.js');
});

// Serves static files from the public folder. Defaults to index.html
app.use(express.static('public'));
// Built-in middleware function which parses incoming requests
app.use(express.urlencoded({ extended: true }));
// Enables the EJS template engine
app.set('view engine', 'ejs');
// Imports and enables routes from route folder with prefix path
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(port, () => {
    console.log(`Server.js listening on port ${port}`)
});