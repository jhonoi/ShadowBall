import React from 'react'
import './addTile.css'
import AddIcon from './add.js'

const AddTile = (props) => {
    return(
        <div style={{width: props.width, height: props.height}} className='addTile' onClick={props.onClick}>
            <AddIcon class='addIcon' color='#B4C3FD' />
        </div>
    )
}

export default AddTile

// <img className='addIcon' alt='add icon' src={addIcon}/>