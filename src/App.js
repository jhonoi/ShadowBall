import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './Dashboard/dashboard'
import Course from './Courses/course'
import Sidebar from './Shared/sidebar/sidebar'
import Sets from './Sets/sets'
import Set from './Set/set'
import './App.css'

const App = () => {
  return (
    <div id='app'>
      <Router>
        <Sidebar />
        <Switch>
          <Route path='/' exact>
            <Dashboard />
          </Route>
          <Route path='/course' exact>
            <Course />
          </Route>
          <Route path='/sets' exact>
            <Sets />
          </Route>
          <Route path='/flashcards' exact>
            <Set />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
