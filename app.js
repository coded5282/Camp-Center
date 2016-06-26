var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"); 

mongoose.connect("mongodb://localhost/yelp_camp"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema); 

Campground.create({
    name: "Granite Creek", 
    image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg",
    description: "This is a huge granite hill"
    
    }, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEW");
            console.log(campground); 
        }
    }); 

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
            res.render("campgrounds", {campgrounds:allCampgrounds}); 
       }
    });
    // res.render("campgrounds", {campgrounds:campgrounds}); 
});

// CREATE - add new campground to database
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var newCampground = {name: name, image: image}; 
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
    res.render("new.ejs"); 
}); 

app.get("/campgrounds/:id", function(req, res) {
    // find the campground with provided ID
    // render show template with that campground 
    res.send("This will be the show page"); 
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