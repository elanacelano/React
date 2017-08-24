// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Require Article schema
var Article = require("./models/Articles");

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
mongoose.connect("mongodb://localhost:3000/NYTimesdbArticle");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

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
  res.sendFile(_dirname + "/public/index.html");
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
