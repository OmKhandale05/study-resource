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

app.get("/", function (req, res) {
    res.render("home");
});



app.listen(3000, function () {
    console.log("Server is running on port 3000!");
})