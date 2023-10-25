const mysql = require('mysql');

const connection = mysql.createConnection({
    HOST: "srv447.hstgr.io",
    USER: "%",
    PASSWORD: "Enia@122020",
    DB: "u417867344_root"
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the remote database!');
});