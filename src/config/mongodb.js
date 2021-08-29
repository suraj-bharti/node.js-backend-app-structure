const MongoClient = require( 'mongodb' ).MongoClient;

let mdb;
function connect(callback){
    MongoClient
    .connect(process.env.MONGO_URL, { useUnifiedTopology:true, useNewUrlParser: true, poolSize: 10 }, function(err, client) {
        if(err) throw err;
        mdb = client.db('testdb');
    });
}

module.exports = {mdb}