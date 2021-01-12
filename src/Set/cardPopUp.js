import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './cardPopUp.css'
import BlurredBack from '../Shared/blurredBackground/blurredBack'

const CardPopUp = (props) => {
    let [termValue, setTermValue] = useState()
    let [defValue, setDefValue] = useState()

    const handleTerm = (event) => {
        setTermValue(event.target.value)
    }

    const handleDef = (event) => {
        setDefValue(event.target.value)
    }

    return(
        ReactDOM.createPortal(
            <React.Fragment>
                <BlurredBack onClick={props.hide} />
                
                <div className='popUpContainer'>
                    <textarea className='cardInput' value={termValue} onChange={handleTerm} placeholder='Term...' rows="4"></textarea>
                    <textarea className='cardInput' value={defValue} onChange={handleDef} placeholder='Definition...' rows="5"></textarea>
                    <div onClick={()=>{props.create(termValue, defValue)}} className='createButton'>Create</div>
                </div>
            </React.Fragment>, document.getElementById('popUp-portal')
        )
    )
}

export default CardPopUp