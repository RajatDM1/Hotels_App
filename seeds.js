var mongoose = require("mongoose");
var Hotels  = require("./models/hotels");
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
]
	

function seedDB(){
	//Remove all Hotels
	Hotels.remove({},function(err){
	if(err){
		console.log(err);
	}
	data.forEach(function(seed){
		Hotels.create(seed,function(err,hotel){
			if(err){
				console.log(err)
			}else{
				console.log("added hotel");
			// 	Comment.create({
			// 		text : "This hotel is amizing!!! Totally love the staff",
			// 		author : "Vir Sanghvi"
			// 	},function(err,comment){
			// 		if(err){
			// 			console.log(err);
			// 		}else{
			// 			hotel.comments.push(comment);
			// 			hotel.save();
			// 			console.log('Created new comment');
			// 		}
			// 	})
			 }
		});
	});
});
	
}

module.exports = seedDB;
