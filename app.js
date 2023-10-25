const mysql = require('mysql');

const connection = mysql.createConnection({
    HOST: "45.87.81.102",
    USER: "u417867344_root",
    PASSWORD: "Enia@122020",
    DB: "users"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
});