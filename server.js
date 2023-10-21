const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const PORT = 3000;

// Connect to DB
const db = new sqlite3.Database('./cold.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});
// Check table exists. If not create one in cold.db
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL)");
// Close connection to DB
db.close((err) => {
    if (err) return console.error(err.message);
});

//  app.get('env') = 'development'
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session({
  name: 'coldcookie',
  secret: 'thisismysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 // 1 hour 
}
}));

// Serves static files from the public folder. Defaults to index.html
app.use(express.static('public'));
// Built-in middleware function which parses incoming requests
app.use(express.urlencoded({ extended: true }));
// Enables the EJS template engine
app.set('view engine', 'ejs');
// Imports and enables routes from route folder with prefix path
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', indexRouter);

app.post('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));