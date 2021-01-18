import React from 'react'
import Tag from '../tag'
import './calenderTile.css'

const CalenderTile = (props) => {
    if(!Array.isArray(props.details)){
        return(
        <div className='calTile'>
        <div className='date'>{props.details}</div>
        <p>{props.assignments[0].Title}</p>
        <p>{console.log(props.assignments)}</p>
        </div>
        )
    }

    if(props.details.length === 2){     //If there arent any assignments for this day
        return (
            <div className='calTile'>
                <div className='date'>{props.details[1]}</div>
                {props.usesDay ? <div className='day'>{props.details[0]}</div> : null}
            </div>
        )
    }else{
        let newArr
        let remainding      //Number of remainding assignments that wont be shown

        if(props.details.length > 5){       //If there's more than 3 assignments then only the first 2
            newArr = props.details.slice(2, 4)
            remainding = (props.details.length - 2) - newArr.length
        }else{
            newArr = props.details.slice(2)
        }

        return(
            <div className='calTile'>
                <div className='date'>{props.details[1]}</div>
                <div className='tagContainer'>
                {newArr.map((item) => {
                    return(
                        <Tag title={item} key={newArr.indexOf(item)} />
                    )
                })}
                {props.details.length > 5 ? <div style={{color: '#8F99A0', backgroundColor:'#DEE7ED'}} className='tag'>{remainding} More</div> : null}
                </div>
            </div>
        )
    }
}

export default CalenderTile