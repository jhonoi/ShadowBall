import {assignmentsDB} from "./assignmentsDB";


const assFunc = (day,mon)=>{
    let assignments=[];
    for(var x=0;x<assignmentsDB.length;x++){
        if(day===assignmentsDB[x].dueDate[0]&&mon===assignmentsDB[x].dueDate[1])
        {   
            assignments.push(assignmentsDB[x]);
        }
    }
    return assignments;
}

export default assFunc;