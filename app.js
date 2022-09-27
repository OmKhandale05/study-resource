//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const imgur = require('imgur-uploader');
const fs = require("fs")
const fileupload = require("express-fileupload");
const loadsh = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileupload());


/*-------------------------------------------
                Global Variables
  -------------------------------------------*/
books = []


/*-------------------------------------------
                Upload method
  -------------------------------------------*/


/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res) {
    res.render("home", { books: books });
});

app.get("/add", function (req, res) {
    res.render("add");
});


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



app.get("/posts/:postId", function (req, res) {
    let bookTitle = loadsh.lowerCase(req.params.postId);
    for(let i=0; i< books.length; i++){
        if(bookTitle===books[i].linkUrl){
            res.render("posts", { bookData: books[i] });
        }
    }
})




app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})