// This file is being used as a console for database

const { result } = require('lodash');
var mysql = require('mysql');

var client = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12615014",
    password: "UfuwzrvJnX",
    database: "sql12615014"
});

client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

let bookRoute = "operatings"
// Edit your query here
let selectQuery = `select * from AdminInfo`;
let query = "alter table BookReferences AUTO_INCREMENT=0"
let deleteQ = "delete from BookReferences where reference_id >=19"
let insertQ = "insert into BookReferences(book_id,book_reference_name,book_reference_link) values(8,'Gate Smashers','https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_'),(8,'Neso Academy','https://www.youtube.com/playlist?list=PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx')";
let updateQ = "update BookData set admin_id= 1 where book_id=1"

let values= ['Lovely Sharma', 'lovely', 'lovely']
createBookDataQuery = `CREATE TABLE BookData(book_id int primary key AUTO_INCREMENT, book_title varchar(100) not null,	book_route varchar(20) not null, book_image_src varchar(150) not null,	book_folderlink varchar(250) not null, admin_id int, foreign key(admin_id) References AdminInfo(admin_id));`
createReferenceTableQuery = `
CREATE TABLE BookReferences(reference_id int primary key AUTO_INCREMENT, book_id int not null, book_reference_name varchar(100) not null, book_reference_link varchar(200) not null, foreign key (book_id) references BookData(book_id))`

let insertBook = `
INSERT INTO BookReferences(book_id, book_reference_name, book_reference_link) values(1,'Gate Smashers', 'https://youtube.com/playlist?list=PLxCzCOWd7aiGz9donHRrE9I3Mwn6XdP8p')
`
let mergeQuery = 'SELECT * FROM BookData inner join BookReferences on BookData.book_id = BookReferences.book_id'

let adminTable = `SELECT * FROM AdminInfo`

let deleteQuery = {
    q1: "DELTE FROM BookReferences",
    q2: "DELTE FROM BookData",
    q3: "alter table BookReferences AUTO_INCREMENT=0",
    q4: "alter table BookData AUTO_INCREMENT=0",

}

client.query(`INSERT INTO AdminInfo(admin_name, admin_username, admin_password) values("Omprakash Khandale","omkhandale05", "om@123")`, (err, result) => {
    if (err) console.log(err);
    else console.log(result);
});
client.end();