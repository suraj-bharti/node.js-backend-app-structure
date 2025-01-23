const express = require('express');
const cors = require('cors');
const halmet = require('helmet'); // Help secure Express apps by setting HTTP response headers.
const morgan = require("morgan"); // HTTP request logging middleware.

// Load environment variables.
if (process.env && process.env.NODE_ENV == 'production') {
	require('dotenv').config({path: '.env.production'});
} else {
	require('dotenv').config();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(halmet());
app.use(morgan("tiny"));

const authMiddleware = require('./middlewares/auth');

// Loading routes
const routes = require('./routes');

// Public routes
app.use("/login", routes.login);

// Private routes (protected by authMiddleware)
app.use("/users", authMiddleware, routes.users);

// 404 Not found
app.use(function(req, res) {
	res.status(404).send('Not found.');
});

require('./loaders')(app);