import React, { useState, useEffect, useRef } from 'react'
import Header from '../Shared/header'
import Body from '../Shared/body'
import SetTile from './setTile'
import AddTile from '../Shared/addTile'
import CreatePrompt from '../Shared/createPrompt/createPrompt'
import './sets.css'

const Sets = () => {
    let [arr, setArr] = useState([
        {title: 'Neurology', count: 1, color: '#FF746A'},
        {title: 'Dreams State', count: 24, color: '#46B5E8'},
        {title: 'Freud', count: 16, color: '#9A7CE4'},
        {title: 'Subconscious', count: 19, color: '#FFBF58'},
        {title: 'Brain', count: 31, color: '#46B5E8'}
    ])

    let [showPrompt, setShowPrompt] = useState(false)
    let initialRender = useRef(true)

    const setFunc = (item) => {
        return (<SetTile key={arr.indexOf(item)} title={item.title} count={item.count} color={item.color} />)
    }

    const addSet = (t, c, col) => {
        setArr([...arr, {title: t, count: c, color: col}])
    }

    const createPrompt = () => {
        setShowPrompt(!showPrompt)
    }

    useEffect(()=>{
        if(initialRender.current){
            initialRender.current = false
        }else{
            setShowPrompt(!showPrompt)
        }
    }, [arr])

    return(
        <div className='setContainer'>
            {showPrompt ? <CreatePrompt item='Set' create={addSet} hide={createPrompt} /> : null}
            <Body>
                <Header title='Psychology Sets' color='#FFBF58' />
                <div className='gridContainer setGrid'>
                    {arr.map(setFunc)}
                    <AddTile paddBottom='40%' onClick={createPrompt}></AddTile>
                </div>
            </Body>
        </div>
    )
}

export default Sets