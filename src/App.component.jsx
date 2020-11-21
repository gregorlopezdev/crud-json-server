import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import UMenubar from './components/utils/UMenubar.component'
import Home from './components/common/Home.component.jsx'
import Course from './components/common/Course.component.jsx'
import AddCourse from './components/common/AddCourse.component.jsx'
import Notfound from './components/common/Notfound.component.jsx'

const App = () => {
  const classes = useStyles()

  return (
    <Router>
      <CssBaseline />
      <UMenubar />
      <div className={classes.app}>
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/courses/:id'>
            <Course />
          </Route>
          <Route path='/add' exact={true}>
            <AddCourse />
          </Route>
          <Route path='/add/:id' exact={true}>
            <AddCourse />
          </Route>
          <Route path='*'>
            <Notfound />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

const useStyles = makeStyles((theme) =>
  createStyles({
    app: {
      maxWidth: `${theme.breakpoints.values.lg}px`,
      margin: `${theme.spacing(2)}px auto`,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  })
)
