import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import './cardPopUp.css'
import BlurredBack from '../Shared/blurredBackground/blurredBack'

const CardPopUp = (props) => {
    let [termValue, setTermValue] = useState(props.term)
    let [defValue, setDefValue] = useState(props.definition)

    const handleTerm = (event) => {
        setTermValue(event.target.value)
    }

    const handleDef = (event) => {
        setDefValue(event.target.value)
    }

    const handleCreate = () => {
        if(termValue.length !== 0 && defValue.value !== 0){
            props.create(termValue, defValue)
        }
    }

    const handleEdit = () => {
        props.edit(termValue, defValue)
    }

    return(
        ReactDOM.createPortal(
            <React.Fragment>
                <BlurredBack onClick={props.hide} />
                
                <div className='popUpContainer'>
                    <textarea className='cardInput' value={termValue} onChange={handleTerm} placeholder='Term...' rows="4"></textarea>
                    <textarea className='cardInput' value={defValue} onChange={handleDef} placeholder='Definition...' rows="5"></textarea>
                    <div onClick={props.operation === 'Edit' ? handleEdit : handleCreate} className='createButton'>{props.operation}</div>
                </div>
            </React.Fragment>, document.getElementById('popUp-portal')
        )
    )
}

export default CardPopUp