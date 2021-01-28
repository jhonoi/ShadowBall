const exp=require("express");
const bp=require('body-parser');
const setModel=require("../models/set");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());

app.post("/:cid",async(req,res,next)=>{
    courseId=req.params.cid;
    const {Title,Colour}=req.body;

    const Set = setModel({
        Title,
        Colour,
        Count:0,
        courseId
    })
    try {
        await Set.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Set:Set});
})

app.get("/:cid",async(req,res,next)=>{
    const courseId=req.params.cid;
    let Sets;
    try {
        Sets= await setModel.find({courseId});
    } catch (error) {
        return next(error);
    }
    
    //console.log(Sets);
    res.status(201).json({Sets:Sets});
})
app.patch("/:sid",async(req,res,next)=>{
    const setId=req.params.sid;
    let Sets;
    try {
        Sets= await setModel.findById({_id:setId});
    } catch (error) {
        return next(error);
    }
    const {Title,Colour}=req.body;
    if(Title)
    {
        Sets.Title=Title;
    }
    if(Colour)
    {
        Sets.Colour=Colour;
    }
    try {
        await Set.save();
    } catch (error) {
        return next(error);
    }
    
    res.status(201).json({Set:Set});
})

app.delete("/:sid",async(req,res,next)=>{
    const setId=req.params.sid;
    let Sets;
    try {
        Sets= await setModel.findById({_id:setId});
    } catch (error) {
        return next(error);
    }
    try {
        await Set.save();
    } catch (error) {
        return next(error);
    }

    res.status(201);
})
module.exports=app;