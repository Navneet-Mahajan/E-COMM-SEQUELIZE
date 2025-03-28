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

app.use('/', (req, res) => {
    res.send("Page not found")
})
app.use(errorHandler);

app.listen(3000, async () => {
    console.log("The Server is Running on http://localhost:3000");
    initializeDatabase();
});