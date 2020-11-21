import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Block, Check } from '@material-ui/icons'

import useApi from '../../hooks/useApi.hook'

const ISCourse = {
  id: '',
  name: '',
  description: '',
  poster: 'https://via.placeholder.com/500',
  price: 0,
  available: false
}

const Course = () => {
  const { id } = useParams()
  const classes = useStyles()
  const apiHook = useApi()
  const history = useHistory()
  const [course, setCourse] = useState(ISCourse)

  const onNavigate = (to) => {
    history.push(to)
  }

  const onUpdateCourse = (id) => {
    onNavigate(`/add/${id}`)
  }
  const onDeleteCourse = (id) => {
    const confirm = window.confirm('Desea eliminar este curso ?')
    if (confirm) {
      apiHook.deleteOneCourse(id).then((res) => onNavigate(`/`))
    }
  }

  useEffect(() => {
    apiHook.getOneCourse(id).then((res) => {
      setCourse(res.data)
      // console.log(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.course}>
      <div className={classes.u_spacing}>
        <Card className={classes.u_poster}>
          <CardActionArea>
            <CardMedia
              className={classes.u_media}
              image={course.poster}
              title={course.name}
            />
          </CardActionArea>
        </Card>
      </div>
      <div className={classes.u_spacing}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {course.name}
              </Typography>
              <Typography
                gutterBottom
                variant='body2'
                color='textSecondary'
                component='p'>
                {course.description}
              </Typography>
              <Chip
                className={classes.u_chip}
                icon={course.available ? <Check /> : <Block />}
                label={course.available ? 'Available' : 'Unavailable'}
                color={course.available ? 'primary' : 'secondary'}
              />
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.u_actions}>
            <Button color='primary' disableRipple={true}>
              Price: ${course.price}
            </Button>
            <Button onClick={() => onUpdateCourse(course.id)} color='primary'>
              Edit
            </Button>
            <Button onClick={() => onDeleteCourse(course.id)} color='secondary'>
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  )
}

export default Course

const useStyles = makeStyles((theme) =>
  createStyles({
    course: {
      display: 'grid',
      gridTemplateColumns: '60% 40%',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
    },
    u_spacing: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    u_actions: {
      justifyContent: 'center'
    },
    u_poster: {
      maxWidth: '100%'
    },
    u_media: {
      height: 400
    },
    u_chip: {
      width: '100%',
      marginTop: theme.spacing(2)
    }
  })
)
