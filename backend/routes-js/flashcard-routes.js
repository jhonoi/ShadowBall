const exp=require("express");
const bp=require('body-parser');
const FcModel=require("../models/flashcards");
const setModel=require("../models/set");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());

app.post("/:sid",async(req,res,next)=>{
    setId=req.params.sid;
    const {Question,Ans}=req.body;

    const flashcard = FcModel({
        Question,
        Ans,
        setId,
    })
    try {
        await flashcard.save();
    } catch (error) {
        return next(error);
    }
    let Set;
    try{
        Set= await setModel.findById({_id:setId});
    }catch(error){
        return next(error);
    }
    Set.Count++;
    Set.save();
    res.status(201).json({flashcard:flashcard._id});
})

app.get("/:sid",async(req,res,next)=>{
    const setId=req.params.sid;
    let flashcard;
    try {
        flashcard= await FcModel.find({setId});
    } catch (error) {
        return next(error);
    }
    
    //console.log(Sets);
    res.status(201).json({flashcard:flashcard});
})

app.patch("/:fid",async(req,res,next)=>{
    const FcId=req.params.fid;
    let flashcard;
    try {
        flashcard= await FcModel.findById({_id:FcId});
    } catch (error) {
        return next(error);
    }
    const {Question,Ans}=req.body;
    if(Question!==null)
    {
        flashcard.Question=Question;
    }
    if(Ans!==null)
    {
        flashcard.Ans=Ans;
    }
    try {
        await flashcard.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({flashcard:flashcard});

})
app.delete("/:sid/:fid",async(req,res,next)=>{
    const FcId=req.params.fid;
    const setId=req.params.sid;
    let flashcard;
    try {
        flashcard= await FcModel.findById({_id:FcId});
    } catch (error) {
        return next(error);
    }
    try {
        await flashcard.remove();
    } catch (error) {
        return next(error);
    }
    let Set;
    try{
        Set= await setModel.findById({_id:setId});
    }catch(error){
        return next(error);
    }
    Set.Count--;
    Set.save();
    res.status(201).json({flashcard:flashcard});

})

module.exports=app;