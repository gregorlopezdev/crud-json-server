import { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import UCourse from '../utils/UCourse.component'
import useApi from '../../hooks/useApi.hook'
// import PropTypes from 'prop-types'

const Home = () => {
  const classes = useStyles()
  const [courses, setCourses] = useState([])
  const apiHook = useApi()

  useEffect(() => {
    apiHook.getAllCourses().then((res) => {
      setCourses(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className={classes.Home}>
      {courses.map((course, key) => (
        <div key={key}>
          {/* Este div es necesario para que los cursos tengan su altura por defecto y no la que le asigna el grid template rows */}
          <UCourse course={course} disabledRedirect={false} />
        </div>
      ))}
    </article>
  )
}

// Home.propTypes = {}

export default Home

const useStyles = makeStyles((theme) =>
  createStyles({
    Home: {
      // margin: `${theme.spacing(3)}px auto`,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
    }
  })
)
