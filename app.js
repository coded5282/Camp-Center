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
   image: String 
});

var Campground = mongoose.model("Campground", campgroundSchema); 

// Campground.create({
//     name: "Granite Creek", 
//     image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"
    
//     }, function(err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEW");
//             console.log(campground); 
//         }
//     }); 

app.get("/", function(req, res) {
    res.render("landing"); 
}); 

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

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs"); 
}); 


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!");  
});