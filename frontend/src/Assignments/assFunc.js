

const assFunc = (day,mon,assignmentsDB)=>{
    let assignments=[];
    //console.log(typeof day);
    if(typeof(day)==="string" &&day>7)
    {
        day=parseInt(day);
        //console.log(typeof day);
        mon-=1;
        
    }else  if(typeof(day)==="string" &&day<=7){
        day=parseInt(day);
        //console.log(typeof day);
        mon+=1;
    }
    for(var x=0;x<assignmentsDB.length;x++){
        if(day===assignmentsDB[x].dueDate[0]&&mon===assignmentsDB[x].dueDate[1])
        {   
            assignments.push(assignmentsDB[x]);
        }
    }
    
    return assignments;
}


export default assFunc;