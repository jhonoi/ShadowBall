import React, { useState } from 'react'
import './dashboard.css'
import Body from '../Shared/body'
import Tile from './tiles/tile';
import AddTile from '../Shared/addTile';
import './tiles/tile.css'
import Header from '../Shared/header'
import Tag from '../Shared/tag'
import courseDB from '../Shared/courseDB'

const Dashboard = () => {
    let i = -1
    const [courseArr, setCourseArr] = useState(courseDB)
    const colors = ['#FF746A', '#FFBF58', '#FFFF6E', '#63DD67', '#46B5E8', '#0097A7', '#9A7CE4']

    const add = () => {
        setCourseArr([...courseArr, 1])
    }

    const populateCourseList = (item) => {
        i++
        return(
            <Tile to={'/courses/' + item.cID} key={i} color={colors[i%colors.length]}>
                <p className='tileTitle'>{item.title.length > 21 ? `${item.title.slice(0, 18)}...` : item.title}</p>
                <p className='tileInfo'>Nothing this week...</p>
                {item.streak ? <Tag title='Streak' /> : null}
            </Tile>
        )
    }

    return(
        <div id='dashboard'>
            <Body>
                <Header title='My Courses' color='#5D788B' />
                <div className='courseContainer'>
                    <div className='courseGrid'>
                        {courseArr.map(populateCourseList)}
                        <AddTile onClick={add} />
                    </div>
                </div>
            </Body>
        </div>
    )
}

export default Dashboard