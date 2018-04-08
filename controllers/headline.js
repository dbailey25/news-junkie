var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = {
  scrape(req, res) {
    // First, we grab the body of the html with request
    axios.get("https://www.theonion.com/c/news-in-brief").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h1 within an article tag, and do the following:
      $("article h1").each(function(i, element) {
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
          .siblings()
          .children("p")
          .text();
        result.sourceId = $(this)
          .parent()
          .parent()
          .parent()
          .attr("data-id");


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
  }
};
