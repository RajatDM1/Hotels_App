var mongoose = require("mongoose");
var Hotel 	 = require("./models/hotels");
var Comment = require("./models/comments");

var data = [
	{name:"Atlantis" , 
	image :"https://www.makemytrip.com/blog/sites/default/files/images/Atlantis-The-Palm-Hotel-%26-Resort.jpg",
	info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum laudantium amet veritatis odit fuga rerum eligendi officia incidunt recusandae blanditiis quis porro, maiores corporis consectetur necessitatibus accusantium nulla quod sequi." },
	{name: "Burj al arab", 
	image : "http://www.orangesmile.com/common/img_final_large/dubai_sightseeing.jpg",
	info:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, molestias natus neque, temporibus quibusdam ab iure eum odit vel ducimus, nesciunt! Nam non eveniet, dignissimos nostrum quibusdam tempora inventore laborum." },
	{name: "Raddison blue", 
	image :"https://media-cdn.tripadvisor.com/media/photo-s/00/15/28/5a/wave-hotel.jpg",
	info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore maiores magnam ipsam distinctio dicta, quod dolorem id amet ipsa. Facere possimus enim omnis, ratione beatae porro quisquam recusandae debitis nostrum!"}
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



