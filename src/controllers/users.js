'use strict'

const jwt = require('jsonwebtoken');
const jwt_key = process.env.JWT_KEY;

const UserModel = require('../models/users')

class UserController {

    async getUsers(req, res) {
        try {
            const results = await UserModel.getUsers();
            res.send({success: true, data: results});
        } catch (err) {
            res.json({success: false, error: err});
        }
    }

    async getUser(req, res) {
        try {
            const results = await UserModel.getUser(req.params.user_id);
            res.send({success: true, data: results});
        } catch (err) {
            res.json({success: false, error: err});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const result = await UserModel.login(email, password);

            if(result) {
                let user = Object.assign({}, result)
                user.token = jwt.sign({email: user.email, user_id: user.id}, jwt_key, {expiresIn: "7d"});
                res.send({success: true, data: user})
            } else {
                return Promise.reject({message: 'You have entered wrong credentials.'})
            }
        } catch (err) {
            res.json({success: false, error: err});
        }
    }
}

module.exports = new UserController()