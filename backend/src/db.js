const mysql =require('mysql');

const conn=mysql.createConnection({
    host:process.env.COVID_HOST,
    user:process.env.COVID_USER,
    password:process.env.COVID_PASSWORD,
    database: process.env.COVID_DB
})


module.exports=conn;