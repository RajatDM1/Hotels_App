var express = require('express');
	app = express();

app.set("view engine", "ejs");
app.listen(3000,function(req,res)
{
	console.log('server is running');
});

app.get('/',function(req,res)
{
	res.render('home');
});

app.get('/hotels',function(req,res)
{
	var rooms = [
		{name: "The Great Palace", image :"data:image/jpeg;base64,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" },
		{name : "Modern Luxury", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjW6fmYdW1ix83XC7EBchLM9tkK3uCcFujuvRovrVVFQiGM2KT"},
		{name : "The Marigold" , image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfE9Do5VCIMBpfEabUtT1CGMoWTlNG5vp_n42GA0WsKzU2326SFA"}
	];
	res.render('rooms',{rooms: rooms });
});