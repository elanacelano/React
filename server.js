// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article schema
var Article = require("./models/Articles");

var cheerio = require("cheerio")

// Create a new express app
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/NYTimesdbArticle");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  console.log("Making a request to MSNBC");

  request("http://www.msnbc.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);

    // Now, we grab every article tag, and do the following:
    $("a.featured-slider-menu__item__link").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).find(".featured-slider-menu__item__link__title").text();
      result.link = $(this).attr("href");

      // create a new entry
      var entry = new Article(result);

      console.log("Creating a new article", entry);

      // Now, save that entry to the db
      entry.save(result, function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log("doc", doc);
        }
      });

    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
});
// app.get("/scrape", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });  

// Main "/" Route. This will redirect the user to our rendered React application
// app.get("/", function(req, res) {
//   res.sendFile(__dirname + "/public/index.html");
// });

// This is the route we will send POST requests to save each Article.
// We will call this route the moment the "Article" or "reset" button is pressed.
app.post("/api", function(req, res) {
  var newArticle = new Article(req.body);
  console.log(req.body);on

  newArticle.save(function(err, doc) {
    if(err){
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});  


app.delete("/api", function(req, res) {

  var Article = Article.findAndDelete({
      ArticleID: ArticleID
    }, {
      $set: {
        Articles: Articles  
      }
    // }, {
    //   delete: true("Updated Articles");
    // }
  }); 
});

// This is the route we will send GET requests to retrieve our most recent Article data.
// We will call this route the moment our page gets rendered
app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});  

  // This GET request will search for the latest ArticleCount
//   Article.find({}).exec(function(err, doc) {

//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.send(doc);
//     }
//   });
// });
// -------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
