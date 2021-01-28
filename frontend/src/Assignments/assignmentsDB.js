import Axios from "axios";
import { useState } from "react";
const DB =(cid)=>{
    
    let assignmentsDB;
    let url="/api/assignments/"+cid;
    Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{
        assignmentsDB=res.data.Assignments;
    }).catch((err)=>{
        return err;
    })
    //console.log(assigns);
    
    
}

export  {DB};