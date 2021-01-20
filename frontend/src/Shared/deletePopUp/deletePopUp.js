import React from 'react'
import './deletePopUp.css'
import ReactDOM from 'react-dom';
import BlurredBack from '../blurredBackground/blurredBack'

const DeletePopUp = (props) => {
    return(
        ReactDOM.createPortal(
            <React.Fragment>
                <BlurredBack onClick={props.hide} />
                
                <div className='popUpContainer'>
                    <div className='deletePrompt'>Are you sure you want to delete this{props.item}</div>
                    <div onClick={props.remove} className='createButton deleteButton'>Delete</div>
                    <div onClick={props.hide} className='createButton cancelButton'>Cancel</div>
                </div>
            </React.Fragment>, document.getElementById('popUp-portal')
        )
    )
}

export default DeletePopUp