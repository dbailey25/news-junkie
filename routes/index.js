// Dependencies =============================================================
var express = require("express");
// var path = require("path");
var axios = require("axios");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
// var headline = require("../models/Headline.js");

// var router = express.Router();
var app = express();
var db = require("../models");
var headline = require('../controllers/headline.js');
var fetch = require('../controllers/fetch.js');
var note = require('../controllers/note.js');

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Routes ===================================================================

// A GET route for scraping the Onion website
app.get("/scrape", headline.scrape);

// Route for getting all Articles from the db
app.get("/articles", fetch.retrieveAll);

// Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", fetch.retrieveOne);

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", note.postNote);

// Route for deleting an Article's associated Note
app.delete("/articles/:id", note.deleteNote);



  module.exports = app;
