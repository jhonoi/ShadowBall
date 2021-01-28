const mongoose = require("mongoose");

const SetCon=mongoose.createConnection("mongodb+srv://admin:yeetkc1@cluster0.mjzsy.mongodb.net/Sets");
const setSchema= mongoose.Schema({
    Title:String,
    Colour:String,
    Count:Number,
    courseId:String

});

module.exports=SetCon.model('Sets',setSchema);