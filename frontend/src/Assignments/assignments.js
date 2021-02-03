import React, { useState ,useEffect} from 'react'
import './assignments.css'
import Body from '../Shared/body'
import Header from '../Shared/header'
import CalenderTile from '../Shared/calenderTile/calenderTile'
import CalFunc from '../Shared/calFunc'
import Assfunc,{assignments} from './assFunc'
import debounce from "lodash.debounce"
import {DB} from "./assignmentsDB"
import { useParams } from 'react-router-dom'
import Axios from "axios"

const Assignments = () => {
    let cid=useParams().cID;
    let assignmentsDB=[];
    let days=["S","M","T","W","T","F","S"];
    const [mounted, setMounted] = useState([])
    useEffect(() =>{

        const DB =async ()=>{
            let url="/api/assignments/"+cid;
           assignmentsDB= Axios.get(url,{headers:{"Content-Type":"application/json"}}).then((res)=>{
            return res.data.Assignments}).then((data)=>{
                //console.log(data);
                
                setMounted([...data]);
           });
        }
        DB();
       
    
        //setMounted(true)
    },[])
    
    console.log(mounted);
   
    const [mon, setD] = useState({
        dayss: new Date().getMonth()+1,
        dayofW: new Date().getMonth()
    })
 
    const prevMonth = () => {
        setD(() => {
            if(mon.dayss === 0) {
                return ({
                    dayss: mon.dayss - 2,
                    dayofW: mon.dayofW - 1
                })
            }else {
                return ({
                    dayss: mon.dayss - 1,
                    dayofW: mon.dayofW - 1
                })
            }
        })
    }
      
    const nextMonth = () => {
        setD(() => {
            if (mon.dayss === 0) {
                return ({
                    dayss: mon.dayss + 2,
                    dayofW: mon.dayofW + 1
                })
            }else {
                return ({
                    dayss: mon.dayss + 1,
                    dayofW: mon.dayofW + 1
                })
            }
        })
    }
    let dummyAssignments = CalFunc(mon)
    //console.log(dummyAssignments);
    
    const calenderFunc = (item) => {
        return item.map((day)=>{
            
            let assignments;
            if(mounted.length===0){
                assignments=[];
            }else{
                assignments=Assfunc(day,mon.dayofW+1,mounted);
            }
            
            return (<CalenderTile key={Math.random() * Math.random()} assignments={assignments} details={day} usesDay={false} />)
        })
    }

    const populateList = (itemArr) => {
        if(itemArr.length > 2){
            return (itemArr.map((item)=>{
                if(item.length > 2){
                    let classTheme
                    switch(item.toLowerCase()){
                        case 'quiz':
                            classTheme = 'greenTagTheme'
                            break
                        case 'paper':
                            classTheme = 'blueTagTheme'
                            break
                        case 'project':
                            classTheme = 'orangeTagTheme'
                            break
                        case 'presentation':
                            classTheme = 'purpleTagTheme'
                            break
                        case 'exam':
                            classTheme = 'redTagTheme'
                            break
                        default: 
                            classTheme = ''
                            break
                    }

                    return (
                        <div className='assListItem' key={itemArr.indexOf(item)}>
                            <div className={classTheme + ' colorCodedDot'}></div>
                            {item.length > 35 ? `${item.slice(0, 33)}...` : item}
                        </div>
                    )
                }
            }))
        }
    }

    const dummyPopulate = (item) => {
        return (
            <div className='assListItem' key={Math.random()}>
                <div className={'redTagTheme colorCodedDot'}></div>
                Tomo blc Don
            </div>
        )
    }

    return(
        <div className='assignments'>
            <Body>
                <Header title='Psychology Assignments' color='#9A7CE4' />
                <div className='setBackground'>
                    <div className='cardList'>{dummyAssignments.map(dummyPopulate)}</div>
                    <div className='assContainer'>
                        <div className='assGridContainer'>
                            <div className='assGrid'>
                                <div onClick={prevMonth} className='dayHead'>S</div>
                                <div className='dayHead'>M</div>
                                <div className='dayHead'>T</div>
                                <div className='dayHead'>W</div>
                                <div className='dayHead'>T</div>
                                <div className='dayHead'>F</div>
                                <div onClick={nextMonth} className='dayHead'>S</div>
                                {dummyAssignments.map(calenderFunc)}
                            </div>
                        </div>
                    </div>
                </div>
            </Body>
        </div>
    )
}

export default Assignments