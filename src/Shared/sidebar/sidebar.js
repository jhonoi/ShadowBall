import React from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import Item from './item'

const Sidebar = () => {
    return(
        <div id="sidebar">
            <Link to='/'>
                <div className='logoContainer'>
                    <i className="material-icons md-24">group_work</i>
                    <span className='logoText'>Shadowball</span>
                </div>
            </Link>
            <ul>
                <li><Item title='Courses' link='/' exact={true} /></li>
                <li><Item title='Flashcards' link='/cards' exact={false} /></li>
                <li><Item title='Notes' link='/notes' exact={true} /></li>
                <li><Item title='Games' link='/games' exact={false} /></li>
                <li><Item title='Groups' link='/groups' exact={false} /></li>
            </ul>
        </div>
    )
}

export default Sidebar