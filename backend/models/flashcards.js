const mongoose = require("mongoose");

const FlashCardCon=mongoose.createConnection("mongodb+srv://admin:yeetkc1@cluster0.mjzsy.mongodb.net/Sets");
const FcSchema= mongoose.Schema({
    Question:String,
    Ans:String,
    setId:String

});

module.exports=FlashCardCon.model('flashcards',FcSchema);