import React from 'react'
import './courseTile.css'

const CourseTile = (props) => {
    let type = 'yee'
    switch(props.type){
        case 'Flashcards':
            type = 'Sets'
            break
        case 'Notes':
            type = 'Pages'
            break
        case 'Assignments':
            type = 'Due'
            break
        default:
            type = ''
    }

    return(
        <div className='courseTile'>
            <div className='header'>
                <i style={{color:props.color}} className="material-icons md-18 icon">style</i>
                <span style={{color:props.color}}>{props.type}</span>
            </div>
            <div className='infoContainer'>
                <div style={{color:props.lightColor}} className='infoNum'>4</div>
                <div style={{color:props.color}} className='infoType'>{type}</div>
            </div>
        </div>
    )
}

export default CourseTile