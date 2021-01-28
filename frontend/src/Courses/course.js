import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './course.css'
import Body from '../Shared/body'
import Header from '../Shared/header'
import CalenderTile from '../Shared/calenderTile/calenderTile'
import CourseTile from './courseTile'
import { WeekFunc } from '../Shared/calFunc'
import Assfunc from '../Assignments/assFunc'
import Axios from "axios"
import courseDB from '../Shared/courseDB'
import {DB} from "../Assignments/assignmentsDB"
let courseID;
const Course = () => {
    const [mon, setD] = useState({
        dayss: new Date().getMonth(),
        dayofW: new Date().getMonth()
    })
    
    let days=["S","M","T","W","T","F","S"];
    courseID = useParams().cID
    let assignmentsDB=[];
    const [mounted, setMounted] = useState(["stuffs"])
    useEffect(() =>{
        const DB =async ()=>{
            let url="/api/assignments/"+courseID;
           assignmentsDB= Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{
            return res.data.Assignments}).then((data)=>{
                //console.log(data);
                
                setMounted([...data]);
           });
        }
        DB();
       
    
        //setMounted(true)
    },[])
    
    console.log(mounted);
        
    


    let dummyAssignments = WeekFunc(mon)
    
    
    let currentCourse = courseDB.find(item => item.cID === courseID);
    let x=-1;
    const calenderFunc = (item) => {
        x++;
        let assignments;
        if(mounted.length===0){
            assignments=[];
        }else{
            assignments=Assfunc(item,mon.dayofW+1,mounted);
        }
        
        //console.log(assignments);
        
        return (<CalenderTile key={Math.random() * Math.random()} assignments={assignments} day={days[x]} details={item} usesDay={false} />)
    }
    return(
        <div>
            {mounted[0]==="stuffs"?<h1>I is loading</h1>:
            <div id='course'>
                <Body>
                    <Header title={currentCourse.title} color='#FF746A' />
                    <div className='courseContainer'>
                        <div id='assignText'>Assignments This Week</div>
                        <div className='scheduleContainer'>
                            {dummyAssignments.map(calenderFunc)}
                        </div>
                        <div className='materialContainer'>
                            <CourseTile to={'/' + courseID + '/sets'} type='Flashcards' color='#46B5E8' lightColor='#B2E7FF' />
                            <CourseTile to={'/' + courseID + '/notes'} type='Notes' color='#63DD67' lightColor='#D4FBD6' />
                            <CourseTile to={'/' + courseID + '/assignments'} type='Assignments' color='#0097A7' lightColor='#C7FAFF' />
                        </div>
                    </div>
                </Body>
            </div>
            }
        </div>
    )
}

export default Course
export {courseID}

/*
<CalenderTile date='1' day='S' today={true} />
<CalenderTile date='2' day='M' today={false} />
<CalenderTile date='3' day='T' today={false} />
<CalenderTile date='4' day='W' today={false} />
<CalenderTile date='5' day='T' today={false} />
<CalenderTile date='6' day='F' today={false} />
<CalenderTile date='7' day='S' today={false} />
*/
