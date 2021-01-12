import React from 'react'
import './calenderTile.css'

const CalenderTile = (props) => {

    if(props.details.length === 2){     //If there arent any assignments for this day
        return (
            <div className='calTile'>
                <div className='date'>{props.details[1]}</div>
                <div className='day'>{props.details[0]}</div>
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
                        <div className='tag' key={newArr.indexOf(item)}>{item}</div>
                    )
                })}
                {props.details.length > 5 ? <div style={{color: '#8F99A0', backgroundColor:'#DEE7ED'}} className='tag'>{remainding} More</div> : null}
                </div>
            </div>
        )
    }
}

export default CalenderTile