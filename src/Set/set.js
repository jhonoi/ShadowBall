import React, { useState, useEffect, useRef } from 'react'
import Header from '../Shared/header'
import Body from '../Shared/body'
import AddIcon from '../Shared/add.js'
import DeleteIcon from '../Shared/delete.js'
import CardPopUp from './cardPopUp'
import './set.css'

const Set = () => {

    let [arr, setArr] = useState([
        {question: 'What is the mitochondria?', ans: ''},
        {question: 'True of False, the Hippocampus is responsible for the body\'s movement', ans: ''},
        {question: 'Swiggity Swooty, I\'m coming for that booty?', ans: ''},
        {question: 'What\'s that, facts? Contract max, I gotta bring this ish back.', ans: ''}
    ])

    let [index, setIndex] = useState(0)
    let [showPopUp, setShowPopUp] = useState(false)
    let initialRender = useRef(true)

    const nextCard = () => {
        if(index !== (arr.length - 1)){
            setIndex(index + 1)
        }
    }

    const prevCard = () => {
        if(index !== 0){
            setIndex(index - 1)
        }
    }

    const listItemClick = (item) => {
        setIndex(arr.indexOf(item))
    }

    const populateList = (item) => {
        return (
            <div onClick={() => listItemClick(item)}
                style={arr.indexOf(item) === index ? {color: '#63DD67', fontWeight: 400} : {color: '#5D788B', fontWeight: 300}}
                key={arr.indexOf(item)}>
                {item.question.length > 35 ? `${item.question.slice(0, 33)}...` : item.question}
            </div>
        )
    }

    const createPopUp = () => {
        setShowPopUp(!showPopUp)
    }

    const addToArr = (q, a) => {
        setArr([...arr, {question: q, ans: a}])
    }

    useEffect(() => {
        if(initialRender.current){
            initialRender.current = false
        }else{
            setShowPopUp(!showPopUp)
        }
    }, [arr])

    return(
        <div className='setContainer setViewContainer'>
            {showPopUp ? <CardPopUp create={addToArr} hide={createPopUp} /> : null}
            <Body>
                <Header title='Subconsciousness Set' color='#63DD67' />
                <div className='setBackground'>
                    <div className='cardList'>{arr.map(populateList)}</div>
                    <div className='cardContainer'>
                        <div className='card' style={{color: '#63DD67'}}>{arr[index].question}</div>
                        <div className='cardNav'>
                            <i onClick={() => prevCard()} className="material-icons md-18">navigate_before</i>
                            <span className='cardPosition'>{index + 1}/{arr.length}</span>
                            <i onClick={() => nextCard()} className="material-icons md-18">navigate_next</i>
                        </div>
                        <div className='setOptionsContainer'>
                            <div onClick={() => createPopUp()} style={{backgroundColor: '#B2E7FF'}} className='iconHolder'><AddIcon class='setIcon' color='#FFFFFF' /></div>
                            <div onClick={() => createPopUp()} style={{backgroundColor: '#D4FBD6'}} className='iconHolder'><i className="material-icons md-18">edit</i></div>
                            <div onClick={() => createPopUp()} style={{backgroundColor: '#FFE9E8'}} className='iconHolder'><DeleteIcon class='setIcon' color='#FFFFFF' /></div>
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    )
}

export default Set