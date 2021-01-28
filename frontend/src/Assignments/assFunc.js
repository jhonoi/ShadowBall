

const assFunc = (day,mon,assignmentsDB)=>{
    let assignments=[];
    
    for(var x=0;x<assignmentsDB.length;x++){
        if(day===assignmentsDB[x].dueDate[0]&&mon===assignmentsDB[x].dueDate[1])
        {   
            assignments.push(assignmentsDB[x]);
        }
    }
    console.log(assignments);
    
    return assignments;
}


export default assFunc;