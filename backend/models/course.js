const mongoose = require("mongoose");

const courseCon=mongoose.createConnection("mongodb+srv://admin:yeetkc1@cluster0.mjzsy.mongodb.net/Courses");
const courseSchema= mongoose.Schema({
    title:String,
    colour:String,
    Streak:Boolean,
    userId:String

});

module.exports=courseCon.model('Course',courseSchema);