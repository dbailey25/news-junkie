// Dependencies =============================================================
var express = require("express");
// var path = require("path");
var axios = require("axios");
var cheerio = require("cheerio");
// var headline = require("../models/Headline.js");

// var router = express.Router();
var app = express();
var db = require("../models");


// Routes =============================================================

// A GET route for scraping the echojs website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get("https://www.theonion.com/c/news-in-brief").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // grab every h1, and do the following:
    $("h1").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("p")
        .text();

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});


  // index route for home page
  app.get("/articles", function(req, res) {
    // Article.all(function(data) {
    //   var hbsObject = {
    //     headlines: data
    //   };
    //   console.log(hbsObject);
    //   // res.render("index", hbsObject);
    //   res.render("home", hbsObject);
    // });

    db.Article.find({})
    .then(function(dbArticle) {
      var hbsObject = {
        headlines: dbArticle
      };
      // If we were able to successfully find Articles, send them back to the client
      res.render("home", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });


  module.exports = app;
