// const mysql = require('mysql2');

// const pool = mysql.createPool(
// {
//     host:"localhost",
//     user:'root',
//     password: 'Ritik26@@',
//     database: 'airbnb',
// });

// module.exports = pool.promise();

const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb://localhost:27017/";

let _db;

const mongoConnect = (callback)=>
{
    MongoClient.connect(MONGO_URL)
    .then((client)=>
    { 
        _db = client.db('airbnb');
        callback();
    }).catch(err=>
    {
        console.log("Error while connecting :" ,err);
    })
}

const getDB = ()=>
{
    if(!_db)
    {
        throw new Error('Mongo not connected');
    }
    return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
