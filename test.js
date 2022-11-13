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

let bookRoute = "operatings"
// Edit your query here
let selectQuery = `select * from BookData`;
let query = "alter table BookData AUTO_INCREMENT=7"
let deleteQ = "delete from BookData where book_id = 7"
let insertQ = "insert into BookReferences(book_id,book_reference_name,book_reference_link) values(8,'Gate Smashers','https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_'),(8,'Neso Academy','https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx')";

client.query(selectQuery, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
});
client.end();