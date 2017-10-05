var express 	= require('express'),
	app 		= express(),
    bodyParser  = require('body-parser'),
    mongoose 	= require('mongoose'),
    Hotel 		= require('./models/hotels'),
    seedDB 		= require('./seeds1'),
    Comment 	= require('./models/comments')

seedDB();
mongoose.connect("mongodb://localhost/hotels");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
// var hotelSchema = new mongoose.Schema({
// 	name : String,
// 	image : String,
// 	info : String
// });

// var Hotel = mongoose.model("Hotel", hotelSchema);

// Hotel.create(
// 	{
// 		name: "El Mirador",
// 		image : "http://www.telegraph.co.uk/content/dam/Travel/hotels/europe/spain/canary-islands/tenerife/iberostar-grand-hotel-mirador-tenerife-l-xlarge.jpg",
// 		info : "Big Beautiful Hotel"

// 	},function(err, hotel){
// 		if(err){
// 			console.log(err);
// 		}else {
// 			console.log('Newly created hotel');
// 			console.log(hotel);
// 		}
// 	});


app.listen(3000,function(req,res)
{
	console.log('server is running');
});



app.get('/',function(req,res)
{
	res.render('home');
});

app.get('/hotels/new',function(req,res){
	res.render('hotels/new');
});


app.get('/hotels',function(req,res)
{
	Hotel.find({},function(err, allhotels){
		if(err){
			console.log(err);
		}else{
			res.render('hotels/index',{hotels:allhotels});
		}
	});		
});

app.post('/hotels',function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var info = req.body.info;
	var newHotel = {
		name : name,
		image : image,
		info : info
	}
	Hotel.create(newHotel,function(err,newlycreate){
		if(err){
			console.log(err);
		}else{
			res.redirect('/hotels');
		}
	}); 
});

//SHOW
app.get('/hotels/:id',function(req,res){
	Hotel.findById(req.params.id).populate("comments").exec(function(err,foundhotels){
		if(err){
			console.log("err");
		}else{
			console.log(foundhotels);
			res.render("hotels/show",{hotel:foundhotels});
		}
	});
});


//comments routes
app.get('/hotels/:id/comments/new',function(req,res){
	Hotel.findById(req.params.id,function(err,newHotel){
		if(err){
			console.log(err);
		}else{
			console.log(newHotel);
			res.render("comments/new",{hotel:newHotel});
		}
	})
});

app.post('/hotels/:id/comments',function(req,res){
	Hotel.findById(req.params.id,function(err,newhotel){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					console.log("this is the new comment "+comment);
					newhotel.comments.push(comment);
					newhotel.save();
					res.redirect('/hotels/'+newhotel._id);
				}
			})
		}
	})
})











