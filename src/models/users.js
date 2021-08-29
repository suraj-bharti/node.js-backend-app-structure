'use strict';

class UserModel {

    async getUsers() {
        try {
            const results = await db.query("SELECT * FROM users LIMIT 10");
            return results;
        } catch (err) {
            Promise.reject(err)
        }
    }

    async getUser(user_id) {
        try {
            const results = await db.query("SELECT * FROM users WHERE user_id=?;", ...[user_id]);
            if(results.length > 0) {
                return results[0];
            } else {
                return Promise.reject('User does not exists.')
            }
        } catch (err) {
            Promise.reject(err)
        }
    }

    async login(email, password) {
        try {
            // const results = await readDB.query("SELECT * FROM users WHERE user_id=?;", ...[user_id]);
            if(email == 'test@gmail.com' && password == 'test') {
                const result = {
                    id: 1,
                    name: 'Suraj Bharti',
                    email: 'ersuaj321@gmail.com',
                }
                return Promise.resolve(result)
            } else {
                return Promise.reject('Authentication faild.')
            }
        } catch (err) {
            Promise.reject(err)
        }
    }

}


module.exports = new UserModel()