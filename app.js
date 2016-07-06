var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"), 
    seedDB = require("./seeds"); 
    
mongoose.connect("mongodb://localhost/yelp_camp"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public")); 
seedDB(); 

// SCHEMA SETUP

app.get("/", function(req, res) {
    res.render("landing"); 
}); 

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
       if (err) {
           console.log(err);
       } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds}); 
       }
    });
    // res.render("campgrounds", {campgrounds:campgrounds}); 
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var desc = req.body.description; 
    var newCampground = {name: name, image: image, description: desc}; 
    // Create a new campground and save to DB 
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err); 
        } else {
            res.redirect("/campgrounds"); 
        }
    });
    
   // get data from form and add to campgrounds array
   // redirect back to campgrounds page 
});

// NEW - show form to create new campground 
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new.ejs"); 
}); 

// SHOW - shows more info about one campground 
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
       if (err) {
           console.log(err); 
       } else {
           console.log(foundCampground); 
           res.render("campgrounds/show", {campground: foundCampground}); 
       }
    });
    // render show template with that campground 
}); 


//===============================
// COMMENTS ROUTES
// ===============================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
           console.log(err); 
       } else {
           res.render("comments/new", {campground: campground}); 
       }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
   // lookup campgrounds using ID
   Campground.findById(req.params.id, function(err, campground) {
      if (err) {
          console.log(err);
          res.redirect("/campgrounds"); 
      } else {
          Comment.create(req.body.comment, function(err, comment) {
             if (err) {
                 console.log(err);
             } else {
                 campground.comments.push(comment); 
                 campground.save(); 
                 res.redirect("/campgrounds/" + campground._id); 
             }
          });
      }
   });
   // create new comment
   // connect new comment to campground 
   // redirect to campground show page 
});


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!");  
});

/* RESTFUL ROUTES

name url verb desc.
=======================
INDEX /dogs GET Display a list of all dogs
NEW /dogs/new GET Displays form to make a new dog
CREATE /dogs POST Add new dog to DB
SHOW /dogs/:id GET Shows info about one dog 
*/ 