const exp=require("express");
const bp=require('body-parser');
const courseModel=require("../models/course");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());

//get all courses via user id
app.get("/:uid",async(req,res,next)=>{
    const userId=req.params.uid;
    let Courses;
    try {
        Courses= await courseModel.find({userId});
    } catch (error) {
        return next(error);
    }
    
    console.log(Courses);
    res.status(201).json({course:Courses});
    
});

//create a course
app.post("/:uid",async (req,res,next)=>{
    
    const userId=req.params.uid;
    console.log(userId);
    
    const {title,colour,Streak}=req.body;
    const Course = courseModel({
        title,
        colour,
        Streak,
        userId
    });
    try {
        Course.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({course:Course});
});
//update a course
app.patch("/:cid",async (req,res,next)=>{
    const courseId=req.params.cid;
    const {title,colour}=req.body;
    console.log(req.body);
    

    let Course;
    try {
        Course=await courseModel.findById({_id:courseId});
    } catch (error) {
        return next(error);
    }
    Course.title=title;
    Course.colour=colour;
    
    try {
        await Course.save();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({course:Course});
})
//delete
app.delete("/:cid",async (req,res,next)=>{
    const courseId=req.params.cid;
    let Course;
    try {
        Course=await courseModel.findById({_id:courseId});
    } catch (error) {
        return next(error);
    }

    try {
        await Course.remove();
    } catch (error) {
        return next(error);
    }
    res.status(201).json({course:Course});
});


module.exports=app;