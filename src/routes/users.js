const express = require('express');
let users = express.Router();

const UserController = require('../controllers/users');

// Fetch all users
users.get('/', UserController.getUsers)

// Get / Add / Update user by user_id
users.route('/:user_id')
    .get(UserController.getUser)
    // .post(UserController.addUser)
    // .put(UserController.updateUser);

module.exports = users