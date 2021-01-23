import {EditorState, convertFromRaw } from "draft-js";
import Axios from "axios"
let notes=[];

// fetch("api/notes/Beerus1",{
//     method:'GET',
//     headers:{
//         "Content-Type":"application/json",
//         "Access-Control-Allow-Origin": "*"
//     }
// }).then((res)=>{
//     return res.json();
// }).then((obj)=>{
//     console.log(obj);
//     let newobj=[];
//     for(var x=0;x<obj.length;x++)
//     {
//         newobj[x]=JSON.stringify(obj[x]);
//     }
    
//     if(newobj.length!==0)
//     {
//         console.log(newobj[0]);
//         notes=[];
        
//         for(var x=0;x<newobj.length;x++)
//         {
//             notes[x]=EditorState.createWithContent(convertFromRaw(JSON.parse(newobj[x])));
//         }
//         // const newNotes=newobj.notes;
//          console.log(notes);
//         // notes=[...newNotes];
//     }else{
        

//         notes=[];
//     }
    
// }).catch((err)=>{
//     console.log(err);
    
// })

Axios.get("api/notes/Beerus1",{headers:{"Content-Type":"application/json"}}).then((res)=>{
    let newobj=res.data;
    for(var x=0;x<newobj.length;x++)
    {
        notes[x]=EditorState.createWithContent(convertFromRaw(JSON.parse(newobj[x])));
    }
    console.log(notes);
    
}
    ).catch((e)=>{console.log(e);
})


export  {notes};