var express 	= require('express'),
	app 		= express(),
    bodyParser  = require('body-parser'),
    mongoose 	= require('mongoose'),
    Hotel 		= require('./models/hotels'),
    seedDB 		= require('./seeds1'),
    Comment 	= require('./models/comments'),
    passport 	= require('passport'),
    User 		= require('./models/User'),
    LocalStrategy = require('passport-local');

seedDB();
mongoose.connect("mongodb://localhost/hotels");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
console.log(__dirname);

//middleware for currentUser
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.use(require('express-session')({
	secret: "This is the secret",
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
			res.render('hotels/index',{hotels:allhotels, currentUser : req.user});
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
app.get('/hotels/:id/comments/new',isLoggedIn,function(req,res){
	Hotel.findById(req.params.id,function(err,newHotel){
		if(err){
			console.log(err);
		}else{
			console.log(newHotel);
			res.render("comments/new",{hotel:newHotel});
		}
	})
});

app.post('/hotels/:id/comments',isLoggedIn,function(req,res){
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


//auth routes
app.get('/register',function(req,res){
	res.render('register');
});

app.post('/register',function(req,res){
	var newUser = new User({username : req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate('local')(req,res,function(){
			res.redirect('/hotels');
		});
	});
});

//show login form 
app.get('/login',function(req,res){
	res.render('login');
});

//middleware
app.post('/login',passport.authenticate('local',
	{successRedirect :'/hotels',
	failureRedirect : '/login'}),function(req,res){
	
});

//logout
app.get('/logout',function(req,res){
	req.logout();
	res.redirect('/hotels');
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}








