//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const imgur = require('imgur-uploader');
const fs = require("fs")
const fileupload = require("express-fileupload");
const loadsh = require("lodash")
require("dotenv").config();

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

const client = new Client({
    host: process.env.ADMIN_HOST,
    user: process.env.ADMIN_USER,
    port: process.env.ADMIN_PORT,
    password: process.env.ADMIN_PASSWORD,
    database: process.env.ADMIN_DATABASE,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});

client.connect();


/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res) {
    // Querying all records to display all books
    client.query("Select * from BookData order by book_title").then((results) => {
        res.render("home", { books: results.rows });
    });
});


/*-------------------------------------------
                Add Book Route
  -------------------------------------------*/
//   This route renders the admin panel for adding new books
app.get("/add", function (req, res) {
    res.render("add");
});


/*-------------------------------------------
                Upload Route
  -------------------------------------------*/
app.post("/upload", function (req, res) {
    // check if files are not empty
    if (!req.files) {
        return res.status(400).send("No files Found!");
    }
    // if file exists store it in myfile variable
    let myfile = req.files.thumbnail;
    
    let uploadPath = __dirname + "/uploads/" + myfile.name;
    // move the file to uploads folder for temp storage
    myfile.mv(uploadPath, function (err) {
        if (err) console.log("Error!");

        // upload the moved file to imgur and recieve a callback
        imgur(fs.readFileSync(uploadPath)).then(data => {

            // set the attributes based on the response we get
            let bookTitle = req.body.bookTitle;
            let bookRoute = req.body.bookRoute;
            let imageSrc = data.link;  // only this is important for us
            let folderUrl = req.body.bookLink;

            // inserting the data into our book database
            client.query("Insert into BookData(book_title, book_route, book_image_src, book_folderlink) values($1,$2,$3,$4)", [bookTitle, bookRoute, imageSrc, folderUrl]).then(data => {
                console.log(data);
            });
            // removing the file from our temporary uploads folder
            fs.unlinkSync(uploadPath);
            
            // redirect admin to the home after inserting and display new updated book
            res.redirect("/");
        });
    });

});


/*-------------------------------------------
                Display Book Route
  -------------------------------------------*/
app.get("/posts/:postId", function (req, res) {
    // perform linear search for the route 
    // if found just render that page only
    client.query("Select * from BookData").then((results) => {
        let booksData = results.rows;
        let bookTitle = loadsh.lowerCase(req.params.postId);
        for (let i = 0; i < booksData.length; i++) {
            if (bookTitle === booksData[i].book_route) {
                res.render("posts", { bookData: booksData[i] });
            }
        }
    });
});

// Starting the app
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000!");
});
