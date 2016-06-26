var express = require("express");
var app = express();
var bodyParser = require("body-parser"); 


app.use(bodyParser.urlencoded({extended: true})); 
app.set("view engine", "ejs"); 

 var campgrounds = [
        {name: "Salmon Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Granite Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Granite Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Granite Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Granite Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Granite Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"},    
        {name: "Red Creek", image: "http://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5253636.jpg"}    
    ];

app.get("/", function(req, res) {
    res.render("landing"); 
}); 

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds:campgrounds}); 
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image; 
    var newCampground = {name: name, image: image}; 
    campgrounds.push(newCampground)
    res.redirect("/campgrounds"); 
   // get data from form and add to campgrounds array
   // redirect back to campgrounds page 
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs"); 
}); 


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("YelpCamp server has started!");  
});