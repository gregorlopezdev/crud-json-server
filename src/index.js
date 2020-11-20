import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home.component.jsx'
import Course from './components/common/Course.component.jsx'
import Notfound from './components/common/Notfound.component.jsx'
import CssBaseline from '@material-ui/core/CssBaseline'

ReactDOM.render(
  <Router>
    <CssBaseline />
    <Switch>
      <Route path='/'>
        <Home />
      </Route>
      <Route path='/course/:id'>
        <Course />
      </Route>
      <Route path='*'>
        <Notfound />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
