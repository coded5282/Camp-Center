var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"), 
    Campground = require("./models/campground"),
    Comment = require("./models/comment"), 
    User = require("./models/user"), 
    seedDB = require("./seeds"); 
    
// requiring routes     
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index"); 

    
mongoose.connect("mongodb://localhost/yelp_camp"); 
app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); 
//seedDB(); // seed the database 

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is secret",
    resave: false,
    saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req, res, next) {
   res.locals.currentUser = req.user; 
   next(); 
});


app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); 

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