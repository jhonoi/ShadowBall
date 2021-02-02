import {EditorState, convertFromRaw } from "draft-js";
import Axios from "axios"
let notes=[];
// Axios.get("api/notes/Beerus1",{headers:{"Content-Type":"application/json"}}).then((res)=>{
//     let newobj=res.data;
//     for(var x=0;x<newobj.length;x++)
//     {
//         notes[x]=EditorState.createWithContent(convertFromRaw(newobj[x]));
//     }
//     console.log(notes);
    
// }
//     ).catch((e)=>{console.log(e);
// })


export  {notes};