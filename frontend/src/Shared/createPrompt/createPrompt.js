import React, { useState, useRef } from 'react'
import './createPrompt.css'
import ReactDOM from 'react-dom';
import BlurredBack from '../blurredBackground/blurredBack'

const CreatePrompt = (props) => {
    let [name, setName] = useState('')
    let colorClicked = useRef('#FF746A')
    const colors = ['#FF746A', '#FFBF58', '#FFFF6E', '#63DD67', '#46B5E8', '#0097A7', '#9A7CE4']

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const handleColor = (col) => {
        colorClicked.current = col
    }

    const handleCreate = () => {
        if(name !== ''){
            props.create(name, 0, colorClicked.current)
        }
    }

    return(
        ReactDOM.createPortal(
            <React.Fragment>
                <BlurredBack onClick={props.hide} />
                
                <div className='popUpContainer'>
                    <div className='deletePrompt createPrompt'>Create A {props.item}</div>
                    <input className='createName' onChange={handleChange} value={name} placeholder='Set name...'></input>
                    <div className='colorContainer'>
                        {colors.map(item => <div onClick={()=>{handleColor(item)}} key={colors.indexOf(item)} style={{backgroundColor: item}} className='colorOption'></div>)}
                    </div>
                    <div onClick={handleCreate} className='createButton'>Create</div>
                </div>
            </React.Fragment>, document.getElementById('popUp-portal')
        )
    )
}

export default CreatePrompt