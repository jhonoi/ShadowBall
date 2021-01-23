const mongoose = require("mongoose");

const notesCon=mongoose.createConnection("mongodb+srv://admin:yeetkc1@cluster0.mjzsy.mongodb.net/Notebook");
const notesSchema= mongoose.Schema({
    id:String,
    notes:Array

});

module.exports=notesCon.model('Notes',notesSchema);
