import React,{useState} from 'react'
import './course.css'
import Body from '../Shared/body'
import Header from '../Shared/header'
import CalenderTile from '../Shared/calenderTile/calenderTile'
import CourseTile from './courseTile'
import {WeekFunc} from '../Shared/calFunc'

import Assfunc from '../Assignments/assFunc'



const Course = () => {
    const [mon, setD] = useState({
        dayss: new Date().getMonth(),
        dayofW: new Date().getMonth()
    })
    let dummyAssignments=WeekFunc(mon);
    console.log(dummyAssignments);
    

    const calenderFunc = (item) => {
            let assignments =Assfunc(item,mon.dayofW+1);
            return (<CalenderTile key={Math.random() * Math.random()} assignments={assignments} details={item} usesDay={false} />)
    }
    return(
        <div id='course'>
            <Body>
                <Header title='Operating Systems' color='#FF746A' />
                <div className='courseContainer'>
                    <div id='assignText'>Assignments This Week</div>
                    <div className='scheduleContainer'>
                        {dummyAssignments.map(calenderFunc)}
                    </div>
                    <div className='materialContainer'>
                        <CourseTile type='Flashcards' color='#46B5E8' lightColor='#B2E7FF' />
                        <CourseTile type='Notes' color='#63DD67' lightColor='#D4FBD6' />
                        <CourseTile type='Assignments' color='#0097A7' lightColor='#C7FAFF' />
                    </div>
                </div>
            </Body>
        </div>
    )
}

export default Course

/*
<CalenderTile date='1' day='S' today={true} />
<CalenderTile date='2' day='M' today={false} />
<CalenderTile date='3' day='T' today={false} />
<CalenderTile date='4' day='W' today={false} />
<CalenderTile date='5' day='T' today={false} />
<CalenderTile date='6' day='F' today={false} />
<CalenderTile date='7' day='S' today={false} />
*/