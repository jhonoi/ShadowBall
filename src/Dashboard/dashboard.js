import React, { useState } from 'react'
import './dashboard.css'
import Body from '../Shared/body'
import Tile from './tiles/tile';
import AddTile from '../Shared/addTile';
import './tiles/tile.css'
import Header from '../Shared/header'
import Tag from '../Shared/tag'

const Dashboard = () => {
    let i = -1;
    const [arr, setArr] = useState([1, 1, 1, 1, 1, 1, 1])
    const colors = ['#FF746A', '#FFBF58', '#FFFF6E', '#63DD67', '#46B5E8', '#0097A7', '#9A7CE4']

    const add = () => {
        setArr([...arr, 1])
    }

    return(
        <div id='dashboard'>
            <Body>
                <Header title='My Courses' color='#5D788B' />
                <div className='gridContainer'>
                    {arr.map((item) => {
                        i++;
                        return(
                            <Tile key={i} color={colors[i%colors.length]}>
                                <p className='tileTitle'>French</p>
                                <p className='tileInfo'>Nothing this week...</p>
                                <Tag title='Streak' />
                            </Tile>
                        )
                    })}
                    <AddTile paddBottom='100%' onClick={add} />
                </div>
            </Body>
        </div>
    )
}

export default Dashboard