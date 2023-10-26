'use strict';
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "45.87.81.102",
    user: "u417867344_root",
    password: "Enia@122020",
    database: "u417867344_root",

});

connection.connect((err) => {
    if (err) {
        console.log("erreur de connection");
        console.log(err);
    }
    else {console.log('Connected to the remote database!')};
});