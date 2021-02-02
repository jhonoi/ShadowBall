const exp=require("express");
const bp=require('body-parser');
const notesModel=require("../models/notes");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());
app.post("/:cid",async(req,res,next)=>{
    courseId=req.params.cid;
    const {notes}=req.body;

    const Note = notesModel({
        notes,
        courseId,
    })
    try {
        await Note.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Note:Note._id});

})

app.get("/:cid",async (req,res,next)=>{

    const courseId=req.params.cid;
    let Note;
    try {
        Note= await notesModel.find({courseId});
    } catch (error) {
        return next(error);
    }
    
    console.log(Note);
    res.status(201).json({Notes:Note});
})

app.patch("/:nid",async(req,res,next)=>{
    const notesId=req.params.nid;
    let Note;
    try {
        Note= await notesModel.findById({_id:notesId});
    } catch (error) {
        return next(error);
    }
    const {notes}=req.body;
    if(notes!==null)
    {
        Note.notes=notes;
    }
    try {
        await Note.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Note:Note});

})
app.delete("/:nid",async(req,res,next)=>{
    const notesId=req.params.nid;
    let Note;
    try {
        Note= await notesModel.findById({_id:notesId});
    } catch (error) {
        return next(error);
    }
    try {
        await Note.remove();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Note:Note});

})


module.exports=app;