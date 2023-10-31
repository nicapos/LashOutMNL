const express = require(`express`);
const bodyParser = require(`body-parser`);
const apiRoutes = require (`./routes/routes.js`);
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require ('express-session');
const MongoStore = require ('connect-mongo');

const db = require(`./database/models/db`);
const mongoose = require ('mongoose');
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.DB_URL,
{useNewURLParser: true, useUnifiedTopology: true});

const HOST = process.env.HOST;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: '*'
}))

app.use(session({
    secret: 'someBigSecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        dbName: 'Test-Sessions'
    }),
    cookie: {
        secure: true, 
        maxAge: 60 * 60 * 100,
        httpOnly: true,
        domain: `http://${HOST}:${PORT}`
    }
}))

// parse incoming requests with JSON payloads
app.use(express.json());

app.use (express.static('public'));
app.use(`/api`, apiRoutes);

app.listen(PORT, () => {
    console.log(`  Server running at port ${PORT}...`);
    console.log(`  - Local:   http://${HOST}:${PORT}/ `);
});