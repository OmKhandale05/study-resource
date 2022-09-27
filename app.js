//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const loadsh = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


/*-------------------------------------------
                Global Variables
  -------------------------------------------*/
books=[
    {
        bookTitle: "Design & Analysis of Algoritms",
        imageSrc: "images/daa.jpg",
        linkUrl: "daa"
    },
    {
        bookTitle: "Design & Analysis of Algoritms",
        imageSrc: "images/ai.jpg",
        linkUrl: "Ai"
    }
]


/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res) {
    res.render("home", {books: books});
});


app.get("/posts/:postId", function (req, res) {
    let postTitle = loadsh.lowerCase(req.params.postId);
    res.render("posts", { title: postTitle});
})




app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})