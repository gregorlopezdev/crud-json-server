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
  Chip,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import {
  Block,
  Check,
  BarChart,
  AttachMoney,
  Delete,
  Edit
} from '@material-ui/icons'

import useApi from '../../hooks/useApi.hook'
// import PropTypes from 'prop-types'

const ISCourse = {
  id: 0,
  name: 'nameless',
  description: 'without description',
  poster: 'https://via.placeholder.com/500',
  price: 0,
  level: 'no level',
  available: false
}

const Course = () => {
  const { id } = useParams()
  const classes = useStyles()
  const apiHook = useApi()
  const history = useHistory()
  const [course, setCourse] = useState(ISCourse)
  const [dialog, setDialog] = useState(false)

  const onOpen = () => setDialog(true)

  const onClose = () => setDialog(false)

  const onNavigate = (to) => {
    history.push(to)
  }

  const onUpdateCourse = (id) => {
    onNavigate(`/add/${id}`)
  }
  const onDelete = (id) => {
    apiHook.deleteOneCourse(id).then(() => onNavigate(`/`))
  }

  useEffect(() => {
    apiHook.getOneCourse(id).then((res) => {
      setCourse(res.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={classes.Course}>
        <Card className={classes.Course_poster}>
          <CardActionArea>
            <CardMedia
              className={classes.Course_posterMedia}
              image={course.poster}
              title={course.name}
            />
          </CardActionArea>
        </Card>
        <div className={classes.Course_content}>
          {/* Este div es necesario para que Course_content tengan su altura por defecto y no la que le asigna el grid template rows */}
          <Card>
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
                <div className={classes.Course_chips}>
                  <Chip
                    className={classes.Course_chip}
                    icon={course.available ? <Check /> : <Block />}
                    label={course.available ? 'Available' : 'Unavailable'}
                    color={course.available ? 'primary' : 'secondary'}
                  />
                  <Chip
                    className={`${classes.Course_chip} ${classes.u_bgYellow}`}
                    icon={<BarChart />}
                    label={course.level}
                    color='primary'
                  />
                  <Chip
                    className={`${classes.Course_chip} ${classes.u_bgGreen}`}
                    icon={<AttachMoney />}
                    label={course.price === 0 ? 'Free' : course.price}
                    color='primary'
                  />
                </div>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.Course_actions}>
              <Button
                className={classes.Course_actionsButton}
                onClick={() => onUpdateCourse(course.id)}
                variant='outlined'
                color='primary'
                startIcon={<Edit />}>
                Edit
              </Button>
              <Button
                className={classes.Course_actionsButton}
                onClick={() => onOpen()}
                variant='outlined'
                color='secondary'
                startIcon={<Delete />}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <Dialog open={dialog} onClose={onClose}>
        <DialogTitle>
          {'This course will be eliminated, do you agree?'}
        </DialogTitle>
        <DialogActions className={classes.Course_actions}>
          <Button
            className={classes.Course_actionsButton}
            onClick={() => onClose()}
            variant='outlined'
            color='primary'
            startIcon={<Block />}>
            disagree
          </Button>
          <Button
            className={classes.Course_actionsButton}
            onClick={() => {
              onClose()
              onDelete(course.id)
            }}
            variant='contained'
            color='secondary'
            startIcon={<Check />}>
            agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Course

const useStyles = makeStyles((theme) =>
  createStyles({
    Course: {
      display: 'grid',
      gridTemplateColumns: '60% 40%',
      gridGap: theme.spacing(3),
      justifyContent: 'center'
    },
    Course_poster: {
      // maxWidth: '100%'
    },
    Course_posterMedia: {
      height: 400
    },
    Course_content: {},
    Course_chips: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center'
    },
    Course_chip: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    },
    Course_actions: {
      justifyContent: 'center'
    },
    Course_actionsButton: {
      width: '100%'
    },
    u_bgGreen: {
      backgroundColor: theme.palette.success.main
    },
    u_bgYellow: {
      backgroundColor: theme.palette.warning.main
    }
  })
)
