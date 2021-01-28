import React, { useState, useEffect, useRef } from 'react'
import Header from '../Shared/header'
import Body from '../Shared/body'
import AddIcon from '../Shared/add.js'
import DeleteIcon from '../Shared/delete.js'
import Axios from "axios"
import CardPopUp from './cardPopUp'
import DeletePopUp from '../Shared/deletePopUp/deletePopUp'
import './set.css'
import { useParams } from 'react-router-dom'

const Set = () => {

    let currentSet = useParams().set
    
    let setId = useParams().setId;
    
    let [arr, setArr] = useState([])
    useEffect(() =>{
        const DB =async ()=>{
            let url="/api/flashcards/"+setId;
           Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{
            return res.data.flashcard}).then((data)=>{
                
                setArr([...data]);
                console.log(data);
                
           });
        }

        DB();
    },[])

    const [index, setIndex] = useState(0)
    const [showCreatePopUp, setShowCreatePopUp] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)
    let initialRender = useRef(true)
    let justDeleted = useRef(false)
    let deletedLastItem = useRef(false)
    const [currentCard, setCurrentCard] = useState({q: '', a: ''})
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
            <div className='cardListContent' onClick={() => listItemClick(item)}
                style={arr.indexOf(item) === index ? {color: '#63DD67', fontWeight: 400} : {color: '#5D788B', fontWeight: 300}}
                key={arr.indexOf(item)}>
                {/*item.Question.length > 35 ? `${item.Question.slice(0, 33)}...` : item.Question*/ item.Question}
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
        
        setCurrentCard(()=>{return({q:arr[index].Question,a:arr[index].Ans})})
    }

    const deletePopUp = () => {
        setShowDeletePopUp(!showDeletePopUp)
    }

    const addToArr = (q, a) => {
        const DB =async ()=>{
            let url="/api/flashcards/"+setId;
           await Axios.post(url,{Question:q,Ans:a},{headers:{"Content-Type":"application/json"}}).then((res)=>{
               console.log(res.data);
               
            setArr([...arr, {Question: q,_id:res.data.flashcard, Ans: a}])
           });
        }

        DB();
        
    }

    const removeFromArr = () => {
        const DB =async ()=>{
            let url="/api/flashcards/"+setId+"/"+arr[index]._id;
            Axios.delete(url,{headers:{"Content-Type":"application/json"}}).then(()=>{
                justDeleted.current = true
                if(index === (arr.length - 1)){
                    deletedLastItem.current = true
                
                    setIndex(index - 1)
                }else{
                    setArr(arr.filter(item => item !== arr[index]))
                }
           });
           
        }

        DB();
        
    }

    const editItemInArr = (Question, Ans) => {
        const DB =async ()=>{
            let url="/api/flashcards/"+arr[index]._id;
           await Axios.patch(url,{Question,Ans},{headers:{"Content-Type":"application/json"}});
           setArr(arr.map((item)=>{
            if(item === arr[index]){
                item = {Question, Ans}
            }
            return item
        }))
        }

        DB();
        
    }

    useEffect(() => {
        if(initialRender.current){
            initialRender.current = false
        }else if(justDeleted.current){
            justDeleted.current = false
            setShowDeletePopUp(!showDeletePopUp)
        }else{
            setShowCreatePopUp(false)
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
                <Header title={currentSet + ' Set'} color='#63DD67' />
                <div className='setBackground'>
                    <div className='cardList'>{arr.map(populateList)}</div>
                    <div className='cardContainer'>
                        <div className='card' style={{color: '#63DD67'}}>{arr.length!==0?arr[index].Question:null}</div>
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
