require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const api = require('./routes/index.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { initializeDatabase } = require('./database/connect-db');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public/'))
app.use('/', api);
app.get('/', (req, res) => res.send("Landing page"))

//using page not fount for invalid route
app.use('/', (req, res) => {
    res.send("Page not found")
})

//Errorhandler - throughout the app 
app.use(errorHandler);

app.listen(3000, async () => {
    console.log("The Server is Running on http://localhost:3000");
    initializeDatabase();  // Initializing database at the time of app initialization 
});
