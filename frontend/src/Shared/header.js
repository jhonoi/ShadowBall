import React from 'react'
import './header.css'

const Header = (props) => {
    return(
        <div id='header'>
            <div id='text' style={{color: props.color}}>{props.title}</div>
        </div>
    )
}

export default Header