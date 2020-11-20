import { useState, useEffect } from 'react'
import useApi from '../../hooks/useApi.hook'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import UMenubar from '../utils/UMenubar.component'
import UCard from '../utils/UCard.component'

const Home = () => {
  const classes = useStyles()
  const [courses, setCourses] = useState([])
  const apiHook = useApi()

  useEffect(() => {
    apiHook.getAllCourses().then((res) => {
      setCourses(res.data)
      console.log(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <UMenubar />
      <article className={classes.grid}>
        {courses.map((course, key) => (
          <div key={key} className={classes.child}>
            <UCard course={course} />
          </div>
        ))}
      </article>
    </>
  )
}

export default Home

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      margin: `${theme.spacing(3)}px auto`,
      display: 'grid',
      gridTemplateColumns: '30% 30%',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
    },
    child: {}
  })
)
