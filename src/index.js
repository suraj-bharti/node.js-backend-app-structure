const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables.
if (process.env && process.env.NODE_ENV == 'production') {
	require('dotenv').config({path: '.env.production'});
} else {
	require('dotenv').config();
}

const auth = require('./middlewares/auth');

// Loading routes
const routes = require('./routes');
app.use("/users", auth, routes.users);
app.use("/login", routes.login);


app.use(function(req, res) {
	res.status(404).send({success: false, message: 'Not found.'});
});

require('./loaders')(app);