var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment"); 

var data = [
    {
        name: "Cloud's Rest", 
        image: "http://vignette2.wikia.nocookie.net/leagueoflegends/images/4/46/Ekko_Render.png/revision/latest?cb=20150513231624",
        description: "blah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blah" 
    },
    {
        name: "Cloud's Dest", 
        image: "http://vignette2.wikia.nocookie.net/leagueoflegends/images/4/46/Ekko_Render.png/revision/latest?cb=20150513231624",
        description: "blah blablah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahahh" 
    },
    {
        name: "Cloud's ERWest", 
        image: "http://vignette2.wikia.nocookie.net/leagueoflegends/images/4/46/Ekko_Render.png/revision/latest?cb=20150513231624",
        description: "blah blahblah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah blahah" 
    }
]



function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err); 
        }
        console.log("removed campgrounds!"); 
        //add a few campgrounds 
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground"); 
                    // create a comment
                    Comment.create(
                        {
                            text: "This place is great!",
                            author: "Homer"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err); 
                            } else {
                                 campground.comments.push(comment); 
                                 campground.save(); 
                                 console.log("Created new comment"); 
                            }
                        });
                }
            });
        });
    }); 
    // add a few campgrounds
};

module.exports = seedDB; 