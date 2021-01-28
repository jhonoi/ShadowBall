const exp=require("express");
const bp=require('body-parser');
const assignmentsModel=require("../models/assignments");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());

app.post("/:cid",async(req,res,next)=>{
    courseId=req.params.cid;
    const {Title,dueDate,Desc,type}=req.body;

    const Assignment = assignmentsModel({
        Title,
        dueDate,
        Desc,
        type,
        courseId
    })
    try {
        await Assignment.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Assignment:Assignment});
})

app.get("/:cid",async(req,res,next)=>{
    const courseId=req.params.cid;
    let Assignments;
    try {
        Assignments= await assignmentsModel.find({courseId});
    } catch (error) {
        return next(error);
    }
    
    console.log(Assignments);
    res.status(201).json({Assignments:Assignments});
})

app.patch("/:aid",async (req,res,next)=>{
    const assignmentsId=req.params.aid;
    const {Title,dueDate,Desc,type}=req.body;
    console.log(req.body);
    

    let Assignments;
    try {
        Assignments=await assignmentsModel.findById({_id:assignmentsId});
    } catch (error) {
        return next(error);
    }
    Assignments.Title=Title;
    Assignments.dueDate=dueDate;
    Assignments.Desc=Desc;
    Assignments.type=type;
    
    try {
        await Assignments.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Assignments:Assignments});
})

app.delete("/:aid",async (req,res,next)=>{
    const assignmentsId=req.params.aid;
    let Assignments;
    try {
        Assignments=await assignmentsModel.findById({_id:assignmentsId});
    } catch (error) {
        return next(error);
    }

    try {
        await Assignments.remove();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({Assignments:Assignments});
});


module.exports=app;