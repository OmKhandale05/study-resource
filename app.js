//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const imgur = require('imgur-uploader');
const fs = require("fs")
const fileupload = require("express-fileupload");
const loadsh = require("lodash")
const session = require('express-session');
require("dotenv").config();
var async = require('async');


// For MySQL database connection
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

const oneDay = 1000 * 60 * 60 * 24;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileupload());
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

let myvar=0;

/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res, next) {
    // Querying all records to display all books
    client.query("Select * from BookData order by book_title", (err, results) => {
        res.render("home", { books: results });
    });
});


/*-------------------------------------------
                Add Book Route
  -------------------------------------------*/
//   This route renders the admin panel for adding new books
app.get("/add", function (req, res) {
    sess = req.session;
    if (sess.isLoggedin) {
        res.render("add");
    } else {
        res.render('admin');
    }
});


app.post("/admin", function (req, res) {
    sess = req.session;
    let username = req.body.username;
    let adminpass = req.body.adminPassword;
    let query = `Select * from AdminInfo where username = '${username}' and login_password= '${adminpass}'`;
    client.query(query, (err, results) => {
        if (results.length == 1) {
            req.session.isLoggedin = results[0].admin_name;
            req.session.adminId = results[0].admin_id;
            myvar=req.session.adminId;
            res.render("add");
        } else {
            res.render('admin');
        }
    });
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
        // if (err) console.log("Error!");

        // upload the moved file to imgur and recieve a callback
        imgur(fs.readFileSync(uploadPath)).then(data => {

            // set the attributes based on the response we get
            let bookTitle = req.body.bookTitle;
            let bookRoute = req.body.bookRoute.trim();
            let imageSrc = data.link;  // only this is important for us
            let folderUrl = req.body.bookLink;
            let references = req.body.bookReferences;

            // Check route if exists
            async.series([
                function (callback) {
                    let checkquery = `Select * from BookData where book_route = '${bookRoute}'`;
                    client.query(checkquery, (err, results) => {
                        if (results.length != 0) {
                            callback(true);
                        }
                        else callback();
                    });
                },
                function (callback) {
                    // inserting the data into our book database
                    let query = `Insert into BookData(book_title, book_route, book_image_src, book_folderlink, admin_id) values('${bookTitle}','${bookRoute}','${imageSrc}','${folderUrl}', ${myvar})`;

                    client.query(query, (err, result) => {
                        callback();
                    });
                },
                function (callback) {
                    // Inserting references if any by selecting the latest id
                    if (references.trim().length != 0) {
                        query = "Select * from BookData order by book_id desc Limit 1";
                        let latestBookId;
                        client.query(query, (err, result) => {

                            latestBookId = result[0].book_id;

                            // If admin has provided any reference then insert them all
                            if (references.length != 0 && latestBookId != -1) {
                                let insertQuery = `insert into BookReferences(book_id,book_reference_name,book_reference_link) values`

                                let newItem = references.split(",");
                                for (let i = 0; i < newItem.length; i++) {
                                    let eachItem = newItem[i].split("http");
                                    eachItem[1] = "http" + eachItem[1];
                                    let refName = eachItem[0].trim();
                                    let refLink = eachItem[1].trim();
                                    insertQuery = insertQuery + `(${latestBookId},'${refName}','${refLink}')`
                                    if (i != newItem.length - 1) insertQuery += ","
                                }
                                client.query(insertQuery, (err, result) => {
                                    if (err) console.log(err);
                                });
                            }
                            callback();
                        });
                    }
                }
            ],
                function (err, result) {
                    if (err) { res.render("error"); }
                    // redirect admin to the home after inserting and display new updated book
                    if (result) res.redirect("/");
                });

            // removing the file from our temporary uploads folder
            fs.unlinkSync(uploadPath);
        });
    });

});


/*-------------------------------------------
                Display Book Route
  -------------------------------------------*/
app.get("/posts/:postId", function (req, res) {
    // perform linear search for the route 
    // if found just render that page only
    let sqlQuery = "Select BookData.book_id,BookData.book_title,BookData.book_route,BookData.book_image_src,BookData.book_folderlink,AdminInfo.admin_name from BookData,AdminInfo where BookData.admin_id=AdminInfo.admin_id";

    client.query(sqlQuery, (err, results) => {
        let booksData = results;
        let bookTitle = loadsh.lowerCase(req.params.postId);
        for (let i = 0; i < booksData.length; i++) {
            if (bookTitle === booksData[i].book_route) {
                client.query(`Select * from BookReferences where book_id = ${booksData[i].book_id}`, (err, refResult) => {
                    // console.log(refResult);
                    res.render("posts", { bookData: booksData[i], bookReferences: refResult });
                });
                break;
            }
        }
    });
});

// Starting the app
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000!");
});
