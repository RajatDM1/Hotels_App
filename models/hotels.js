var mongoose = require("mongoose");
var hotelSchema = new mongoose.Schema({
	name : String,
	image : String,
	info : String,
	comments : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref : "Comment"
		}
	]
});

//var Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = mongoose.model("Hotel", hotelSchema);