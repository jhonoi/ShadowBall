import React from 'react'

const DeleteIcon = (props) => {
    return(
        <svg className={props.class} width="24" height="2" viewBox="0 0 24 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1" x2="24" y2="1" stroke={props.color} strokeWidth="2"/>
        </svg>
    )
}

export default DeleteIcon