const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bitacora_pagos'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONECTADA!');
});

module.exports = db;