import React from 'react'
import './course.css'
import Body from '../Shared/body'
import Header from '../Shared/header'
import CalenderTile from './calenderTile'
import CourseTile from './courseTile'

let dummyAssignments = [
    ['S', '1'],
    ['M', '2', 'Exam', 'Project', 'Paper', 'Quiz'],
    ['T', '3'],
    ['W', '4'],
    ['T', '5', 'Quiz'],
    ['F', '6', 'Paper', 'Quiz', 'Project', 'Presentation', 'Exam'],
    ['S', '7']
]

const calenderFunc = (item) => {
    return(<CalenderTile key={dummyAssignments.indexOf(item)} details={item} />)
}

const Course = () => {
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
