import React from 'react'
import './tile.css'

const Tile = (props) => {
    return(
        <div className='tile' style={{color: props.color}}>
            {props.children}
        </div>
    )
}

export default Tile