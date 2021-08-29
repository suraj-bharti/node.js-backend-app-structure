const express = require('express');
let login = express.Router();

const UserController = require('../controllers/users');


login.post('/', UserController.login)

module.exports = login