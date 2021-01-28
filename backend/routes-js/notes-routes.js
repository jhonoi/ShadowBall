const exp=require("express");
const bp=require('body-parser');
const notesModel=require("../models/notes");
const { v4: uuidv4 } = require('uuid');


const app=exp.Router();
app.use(bp.urlencoded({extended:true}));

app.use(bp.json());

app.get("/:uid",async (req,res,next)=>{
    const uid=req.params.uid;
    const Notes = new notesModel({
        id:uid,
        notes:[]
    })   

    notesModel.findOne({id:uid},(err,foundNotes)=>{
        if(err)
        {
            console.log(err);
            
        }else{
            console.log(foundNotes.notes);
            res.status(201).send(foundNotes.notes);
        }
    })
    
    // console.log(uid);
    // try{
    //     await Notes.save();
    // }catch(err){
    //     console.log(err);
        
    // }
    //res.status(201).send(Notes);

})

app.post("/:uid",(req,res,next)=>{
    const notes=req.body;
    const uid=req.params.uid
    const Notes = new notesModel({
        id:uid,
        notes:notes
    }) 
    

    notesModel.updateOne({id:uid},{notes:notes},(err)=>{
        if(err)
        {
            console.log(err);
            
        }else{
            console.log("it update brrrr");
           console.log(notes);
            
            
        }
    })
    //res.status(201).json({notes:Notes});

})

module.exports=app;