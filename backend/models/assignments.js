const mongoose = require("mongoose");

const assignmentsCon=mongoose.createConnection("mongodb+srv://admin:yeetkc1@cluster0.mjzsy.mongodb.net/Assignments");
const assignmentsSchema= mongoose.Schema({
    Title:String,
    dueDate:Array,
    Desc:String,
    type:String,
    courseId:String

});

module.exports=assignmentsCon.model('Assignments',assignmentsSchema);