var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var PORT = process.env.PORT || 3000;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newsjunkie", {
  useMongoClient: true
});

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var api = require("./routes/api.js");
var index = require("./routes/index.js");
// var view = require("./routes/view.js");

// app.use(api);
app.use(index);
// app.use(view);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
