import React from 'react'
import { Link } from 'react-router-dom'
import './tile.css'

const Tile = (props) => {
    return(
        <Link to={props.to} exact='true'>
            <div className='tile' style={{color: props.color}}>
                {props.children}
            </div>
        </Link>
    )
}

export default Tile