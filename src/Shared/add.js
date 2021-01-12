import React from 'react'

const AddIcon = (props) => {
    return(
        <svg className={props.class} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="12.5" y1="2.18557e-08" x2="12.5" y2="24" stroke={props.color}/>
        <line y1="11.5" x2="24" y2="11.5" stroke={props.color}/>
        </svg>
    )
}

export default AddIcon