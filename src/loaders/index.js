"use strict";

module.exports = (app) => {
    if (!app) return;
    
    const port = process.env.PORT || '3000';

    // To start server with mysql uncomment this.
    // const startDB = require('../config/mysql')
    // global.db = new startDB();

    // To start server with mongodb uncomment this.
    // const mdb = require('../config/mongodb')
    // global.mdb = mdb;

    app.listen(port, () => {
        console.log(`Server (${process.env.NODE_ENV}) started at http://localhost:${port}`);
    });

};