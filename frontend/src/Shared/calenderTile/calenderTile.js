import React from 'react'
import Tag from '../tag'
import './calenderTile.css'

const CalenderTile = (props) => {
    if(!Array.isArray(props.details)){
        if(props.assignments.length!==0)
        {

            let newArr
            let remainding      //Number of remainding assignments that wont be shown
            let remArr

            if(props.assignments.length > 2){       //If there's more than 3 assignments then only the first 2
                newArr = [props.assignments[0], props.assignments[1]]
                remArr= props.assignments.slice(2);
                remainding = props.assignments.length - newArr.length
            }else{
                newArr = props.assignments;
            }

            return(
                <div className='calTile'>
                    <div className='date'>{props.details}</div>
                    <div className='tagContainer'>
                    {newArr.map((item) => {
                        return(
                            <Tag title={item.type} key={newArr.indexOf(item)} />
                        )
                    })}
                    {props.assignments.length > 2 ? <div onClick={()=>{console.log(remArr)}} style={{color: '#8F99A0', backgroundColor:'#DEE7ED'}} className='tag'>{remainding} More</div> : null}
                    </div>
                </div>
            )
        }else{
            return(
                <div className='calTile'>
                    <div className='date'>{props.details}</div>
                    <div className='day'>S</div>  {/*-------------------------EH BWOY BUREY FIX DIS BREDDA.-----------------------*/}
                </div>
            )
        }
       
    }
}

export default CalenderTile