// This file is being used as a console for database

const { result } = require('lodash');
var mysql = require('mysql');

var client = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12561563",
    password: "MAkRFeRh3z",
    database: "sql12561563"
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


// Edit your query here
let selectQuery = "Select BookData.book_title,AdminInfo.admin_name from BookData,AdminInfo where BookData.admin_id=AdminInfo.admin_id";
let query = "Update BookData set admin_id =2 where book_id>=5"

client.query(selectQuery, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
});
client.end();