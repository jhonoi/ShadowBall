import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard/dashboard'
import Course from './Courses/course'
import Sidebar from './Shared/sidebar/sidebar'
import Sets from './Sets/sets'
import Set from './Set/set'
import Assignments from './Assignments/assignments'
import './App.css'
import Notes from './notes'

const App = () => {
  return (
    <div id='app'>
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path='/courses/:cID' exact>
            <Course />
          </Route>
          <Route path='/:cID/sets' exact>
            <Sets />
          </Route>
          <Route path='/flashcards' exact>
            <Set />
          </Route>
          <Route path='/:cID/assignments' exact>
            <Assignments />
          </Route>
          <Route path='/:cID/notes' exact>
            <Notes />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
