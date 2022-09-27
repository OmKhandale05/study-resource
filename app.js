//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const imgur = require('imgur-uploader');
const fs = require("fs")
const fileupload = require("express-fileupload");
const loadsh = require("lodash")

// For database connection
const { Client } = require("pg");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileupload());


/*-------------------------------------------
                Global Variables
  -------------------------------------------*/
var books;

// DB credentials
const client = new Client({
    host: "tiny.db.elephantsql.com",
    user: "ygxvpnte",
    port: "5432",
    password: "Z76TPbkGhluY1P4yj_ZuERcNC3HuiMcQ",
    database: "ygxvpnte",
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});

client.connect();


/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res) {
    client.query("Select * from BookData").then((results) => {
        // console.log(res.rows[0].imagetitle);
        books = results.rows;
        // console.log(books);
        res.render("home", { books: results.rows });
        // client.end();
    });
});


/*-------------------------------------------
                Add Book Route
  -------------------------------------------*/

app.get("/add", function (req, res) {
    res.render("add");
});


/*-------------------------------------------
                Upload Route
  -------------------------------------------*/

app.post("/upload", function (req, res) {
    if (!req.files) {
        return res.status(400).send("No files Found!");
    }
    let myfile = req.files.thumbnail;
    let uploadPath = __dirname + "/uploads/" + myfile.name;
    myfile.mv(uploadPath, function (err) {
        if (err) console.log("Error!");

        imgur(fs.readFileSync(uploadPath)).then(data => {
            let bookItem = {
                bookTitle: req.body.bookTitle,
                linkUrl: req.body.bookRoute,
                imageSrc: data.link,
                folderUrl: req.body.bookLink
            }
            console.log(bookItem);
            books.push(bookItem);
            res.redirect("/");
        });
    });

});


/*-------------------------------------------
                Display Book Route
  -------------------------------------------*/

app.get("/posts/:postId", function (req, res) {
    console.log(books);
    let bookTitle = loadsh.lowerCase(req.params.postId);
    for (let i = 0; i < books.length; i++) {
        if (bookTitle === books[i].book_route) {
            res.render("posts", { bookData: books[i] });
        }
    }
})




app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})