var mongoose = require("mongoose");
var Hotel 	 = require("./models/hotels");
var Comment = require("./models/comments");

var data = [
	{name:"Atlantis" , 
	image :"https://www.makemytrip.com/blog/sites/default/files/images/Atlantis-The-Palm-Hotel-%26-Resort.jpg",
	info:"Dubai" },
	{name: "Burj al arab", 
	image : "http://www.orangesmile.com/common/img_final_large/dubai_sightseeing.jpg",
	info:"Dubai" },
	{name: "Raddison blue", 
	image :"https://media-cdn.tripadvisor.com/media/photo-s/00/15/28/5a/wave-hotel.jpg",
	info: "Dubai"}
];
	

function seedDB(){
	Hotel.remove({},function(err){
	if(err){
		console.log(err);
	}else{
		console.log('removed hotels');
		data.forEach(function(seed){
		Hotel.create(seed, function(err,data){
			if(err){
				console.log(err);
			}else{
				console.log('added a hotel');
				//create a comment
				Comment.create({
					text : "Amazing hotel !! Just love the staff",
					author : "Vir Sanghvi"
				},function(err, comment){
					if(err){
						console.log(err)
					}else{
						data.comments.push(comment);
						data.save();
						console.log("Created a new comment");
					}
				});
			}
		});	
	});
	}
});	
}

module.exports = seedDB;



