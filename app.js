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
    user: "sql12615014",
    password: "UfuwzrvJnX",
    database: "sql12615014"
});

client.connect(async (err) => {
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

let myvar = 0;

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
app.get("/admin", function (req, res) {
    if (req.session.isLoggedin) {
        res.redirect("/adminView");
    } else {
        res.render('admin');
    }
});


app.post("/admin", function (req, res) {
    sess = req.session;
    let username = req.body.username;
    let adminpass = req.body.adminPassword;
    let query = `Select * from AdminInfo where admin_username = '${username}' and admin_password= '${adminpass}'`;
    client.query(query, (err, results) => {
        if (err) console.log(err);
        else {
            console.log(results);
            console.log('hi');
            if (results.length == 1) {
                req.session.isLoggedin = true;
                req.session.adminFullName = results[0].admin_name;
                req.session.adminId = results[0].admin_id;
                myvar = req.session.adminId;
                res.send({ statusCode: 0 });
            } else {
                // res.render('admin');
                res.send({ statusCode: 1 });

            }
        }
    });
});


/*-------------------------------------------
                Admin View Route
  -------------------------------------------*/

app.get('/adminView', (req, res) => {
    if (!(req.session.isLoggedin)) res.redirect('/admin');
    else {
        let query = "Select * from BookData order by book_id";
        client.query(query, function (err, results) {
            if (err) console.log(err);
            else {
                // console.log(results);
                let bookDetails = results;
                res.render('adminView', { bookDetails: bookDetails })
            }
        })
    }
});


app.delete('/adminView', (req, res) => {
    if (!(req.session.isLoggedin)) res.redirect('/admin');
    else {
        bookId = req.body.bookId;
        let query = `Delete from BookReferences where book_id = ${bookId}`
        try {
            client.query(query, (err, result) => {
                if (err) {
                    throw err;
                } else if (result) {
                    client.query(`DELETE FROM BookData where book_id = ${bookId}`, (err, result) => {
                        if (err) throw err;
                        else res.send({ statusCode: 0 })
                    })
                }
            })
        } catch (err) {
            console.log(err);
            res.send({ statusCode: 1 });
        }
    }
});


app.put('/adminView', (req, res) => {
    if (!(req.session.isLoggedin)) res.redirect('/admin');
    else {
        let bookId = req.body.bookId;
        let bookTitle = req.body.title;
        let link = req.body.link;
        console.log(bookTitle, link, bookId);
        let query = `Update BookData set book_title= "${bookTitle}", book_folderlink = "${link}" where book_id = ${bookId}`
        console.log(query);
        try {
            client.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                } else if (result) {
                    console.log(result);
                    res.send({ statusCode: 0 })
                }
            })
        } catch (err) {
            console.log(err);
            res.send({ statusCode: 1 });
        }
    }
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
                                    // else callback();
                                });
                            }
                            callback();
                        });
                    } else callback();
                }
            ],
                function (err, result) {
                    if (err) { res.render("error"); }
                    // redirect admin to the home after inserting and display new updated book
                    else if (result) {
                        res.redirect("/adminView");
                    }
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
    let bookId = loadsh.lowerCase(req.params.postId);
    let sqlQuery = `Select BookData.book_id,BookData.book_title,BookData.book_route,BookData.book_image_src,BookData.book_folderlink,AdminInfo.admin_name from BookData,AdminInfo where BookData.admin_id=AdminInfo.admin_id and BookData.book_id='${bookId}'`;

    client.query(sqlQuery, (err, results) => {
        client.query(`Select * from BookReferences where book_id = ${results[0].book_id}`, (err, refResult) => {
            res.render("posts", { bookData: results[0], bookReferences: refResult });
        });
    });
});

// To handle invalid routes
app.use(function (req, res) {
    // Invalid request
    res.render("error");

});

// Starting the app
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000!");
});
