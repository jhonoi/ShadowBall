import React from 'react'
import ReactDOM from 'react-dom'
import './blurredBack.css'

const BlurredBack = (props) => {
    return(
        ReactDOM.createPortal(<div onClick={props.onClick} className='blurredBack'></div>,document.getElementById('blurred-portal'))
    )
}

export default BlurredBack