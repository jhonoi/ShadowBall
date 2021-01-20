import React, { useState, useEffect, useRef } from 'react'
import Header from '../Shared/header'
import Body from '../Shared/body'
import AddIcon from '../Shared/add.js'
import DeleteIcon from '../Shared/delete.js'
import CardPopUp from './cardPopUp'
import DeletePopUp from '../Shared/deletePopUp/deletePopUp'
import './set.css'

const Set = () => {

    let [arr, setArr] = useState([
        {question: 'What is the mitochondria?', ans: ''},
        {question: 'True of False, the Hippocampus is responsible for the body\'s movement', ans: ''},
        {question: 'Swiggity Swooty, I\'m coming for that booty?', ans: ''},
        {question: 'What\'s that, facts? Contract max, I gotta bring this ish back.', ans: ''}
    ])

    let [index, setIndex] = useState(0)
    let [showCreatePopUp, setShowCreatePopUp] = useState(false)
    let [showDeletePopUp, setShowDeletePopUp] = useState(false)
    let initialRender = useRef(true)
    let justDeleted = useRef(false)
    let deletedLastItem = useRef(false)
    let [currentCard, setCurrentCard] = useState({q: '', a: ''})
    let editClicked = useRef(false)
    let operationMode = useRef('')

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
        editClicked.current = true
        operationMode.current = 'Create'
        setCurrentCard({q: '', a: ''})
    }

    const editPopUp = () => {
        editClicked.current = true
        operationMode.current = 'Edit'
        setCurrentCard({q: arr[index].question, a: arr[index].ans})
    }

    const deletePopUp = () => {
        setShowDeletePopUp(!showDeletePopUp)
    }

    const addToArr = (q, a) => {
        setArr([...arr, {question: q, ans: a}])
    }

    const removeFromArr = () => {
        justDeleted.current = true
        if(index === (arr.length - 1)){
            deletedLastItem.current = true
            setIndex(index - 1)
        }else{
            setArr(arr.filter(item => item !== arr[index]))
        }
    }

    const editItemInArr = (q, a) => {
        setArr(arr.map((item)=>{
            if(item === arr[index]){
                item = {question: q, ans: a}
            }
            return item
        }))
    }

    useEffect(() => {
        if(initialRender.current){
            initialRender.current = false
        }else if(justDeleted.current){
            justDeleted.current = false
            setShowDeletePopUp(!showDeletePopUp)
        }else{
            setShowCreatePopUp(!showCreatePopUp)
        }
    }, [arr])

    useEffect(() => {
        if(!initialRender.current && deletedLastItem.current){
            deletedLastItem.current = false
            setArr(arr.filter(item => item !== arr[index + 1]))
        }
    }, [index])

    useEffect(() => {
        if(!initialRender.current && editClicked.current){
            editClicked.current = false
            setShowCreatePopUp(!showCreatePopUp)
        }
    }, [currentCard])

    return(
        <div className='setContainer setViewContainer'>
            {showCreatePopUp ? <CardPopUp operation={operationMode.current} term={currentCard.q} definition={currentCard.a} edit={editItemInArr} create={addToArr} hide={createPopUp} /> : null}
            {showDeletePopUp ? <DeletePopUp remove={removeFromArr} item='card' hide={deletePopUp} /> : null}
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
                            <div onClick={() => editPopUp()} style={{backgroundColor: '#D4FBD6'}} className='iconHolder'><i className="material-icons md-18">edit</i></div>
                            <div onClick={() => deletePopUp()} style={{backgroundColor: '#FFE9E8'}} className='iconHolder'><DeleteIcon class='setIcon' color='#FFFFFF' /></div>
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    )
}

export default Set
