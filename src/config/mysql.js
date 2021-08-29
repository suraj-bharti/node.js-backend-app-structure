"use strict";

const mysql = require("mysql");

const CreateDB = () => {
    const poolConfig = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        multipleStatements: true,
        connectTimeout: 8 * 1000,
        acquireTimeout: 8 * 1000
    }

    const connectionPool = mysql.createPool(poolConfig);

    connectionPool.on("connection", (connection) => {
        console.info('new connection: ' + connection.threadId);
        connection.on('err', (error) => {
            console.error(Object.assign(err.toJSON()));
        })
    });

    connectionPool.on("error", () => {
        console.error(...arguments);
    });

    connectionPool.on("uncaughtException", () => {
        console.error(...arguments);
    });

    connectionPool.on("disconnect", () => {
        console.error(...arguments);
    });
    
    /**
     * Perform a DB query but use a Promise instead of function callback
     * @param  {String}     query       The mysql query to run
     * @param  {Array}      params      The params you need to use in the above query. Don't pass if you're using pre-escaped values
     * @param  {Function}   callback    Optional. If one is not provided, a promise is returned. 
     * @return {Promise}                The promise will reject if a connection wasn't acquired or your query failed. It will resolve if the query was successful.
     */
    const dbConnection = {
        escape: (val) => connectionPool.escape(val),
        query: (query, ...params) => {
            if (typeof params[params.length-1] === 'function') {
                let callback = params.pop()
                
                connectionPool.getConnection((err, connection) => { 
              
                    if (err)
                        return callback(err)

                    connection.query(query, ...params, (err, retval) => {
                        if (err) {
                            connection.release()
                            return callback(err)
                        }

                        callback(undefined, retval)
                        connection.release()
                    })
                })
            }
            else {
                return new Promise((resolve, reject) => {
                    connectionPool.getConnection((err, connection) => { 
              
                        if (err)
                            return reject(err)

                        connection.query(query, params || [], (err, retval) => {
                            if (err) {
                                connection.release()
                                return reject(err)
                            }

                            resolve(retval)
                            connection.release()
                        })
                    })
                })
            }
        },
        connection: async () => new Promise((resolve, reject) => {
            connectionPool.getConnection((err, connection) => { 
      
                if (err)
                    return reject(err);

                resolve(connection);
            })
        })

    }

    return dbConnection
}

module.exports = (function() {
    return CreateDB()
});