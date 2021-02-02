import React, { useState, useEffect, useRef } from 'react'
import Header from '../Shared/header'
import Body from '../Shared/body'
import SetTile from './setTile'
import AddTile from '../Shared/addTile'
import Axios from "axios"
import CreatePrompt from '../Shared/createPrompt/createPrompt'
import './sets.css'
import { useParams } from 'react-router-dom'

const Sets = () => {
    
    let currentCourse = useParams().cID
    let [arr, setArr] = useState(["stuff"]);
    useEffect(() =>{
        const DB =async ()=>{
            let url="/api/sets/"+currentCourse;
           Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{
            return res.data.Sets}).then((data)=>{
                
                setArr([...data]);
           });
        }
        DB();
    },[])

    let [showPrompt, setShowPrompt] = useState(false)
    let initialRender = useRef(true)

    const setFunc = (item) => {
        let x=0;
        return (<SetTile to={'/' + currentCourse + '/sets/' + item.Title+"/"+item._id} key={arr.indexOf(item)} title={item.Title} count={item.Count} color={item.Colour} />)
    }

    const addSet = (t,col) => {
        const DB =async ()=>{
            let url="/api/sets/"+currentCourse;
           Axios.post(url,{Title:t,Colour:col},{headers:{"Content-Type":"application/json"}});
           setArr([...arr,{Title:t,Count:0,Colour:col}]);
        }
        DB();
        
    }

    const createPrompt = () => {
        setShowPrompt(!showPrompt)
        
    }

    useEffect(()=>{ 
        setShowPrompt(false)
    }, [arr])

    return(
        <div>
            {arr[0]==="stuffs"?<h1>Loading</h1>:
            <div className='setContainer'>
                {showPrompt ? <CreatePrompt item='Set' create={addSet} hide={createPrompt} /> : null}
                <Body>
                    <Header title='Psychology Sets' color='#FFBF58' />
                    <div className='setGrid'>
                        {arr.map(setFunc)}
                        <AddTile width='100%' height='120px' onClick={createPrompt}></AddTile>
                    </div>
                </Body>
            </div>
        }
        </div>
    )
}

export default Sets