import React from 'react'
import { NavLink } from 'react-router-dom'
import './item.css'

const Item = (props) => {
    return(
        <NavLink to={props.link} exact={props.exact} className='item'>
            <i className="material-icons md-18">school</i>
            <span className='title'>{props.title}</span>
        </NavLink>
    )
}

export default Item