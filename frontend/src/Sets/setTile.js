import React from 'react'
import './setTile.css'

const SetTile = (props) => {
    return(
        <div className='setTile'>
            <div className='setTitle' style={{color: props.color}}>{props.title}</div>
            <div className='cardCount'>{props.count} {props.count === 1 ? 'Card' : 'Cards'}</div>
            <i className="material-icons md-18">more_vert</i>
        </div>
    )
}

export default SetTile