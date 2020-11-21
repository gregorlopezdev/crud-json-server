import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Block, Check, BarChart, AttachMoney } from '@material-ui/icons'

import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const UCourse = ({ course, disabledRedirect }) => {
  const classes = useStyles()
  const history = useHistory()

  const onNavigate = (id) => {
    history.push(`/courses/${id}`)
  }

  return (
    <Card className={classes.Course}>
      <CardActionArea onClick={() => disabledRedirect || onNavigate(course.id)}>
        <CardMedia
          className={classes.Course_media}
          image={course.poster || 'https://via.placeholder.com/500'}
          title={course.name || 'nameless'}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {course.name || 'untitle'}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {course.description || 'without description'}
          </Typography>
          <div className={classes.Course_chips}>
            <Chip
              className={classes.Course_chip}
              icon={course.available ? <Check /> : <Block />}
              label={course.available ? 'Available' : 'Unavailable'}
              color={course.available ? 'primary' : 'secondary'}
            />
            <Chip
              className={classes.Course_chip}
              icon={<BarChart />}
              label={course.level}
              color='primary'
            />
            <Chip
              className={classes.Course_chip}
              icon={<AttachMoney />}
              label={course.price === 0 ? 'Free' : course.price}
              color='secondary'
            />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

UCourse.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    poster: PropTypes.string,
    price: PropTypes.number,
    available: PropTypes.bool
  }),
  disabledRedirect: PropTypes.bool
}

export default UCourse

const useStyles = makeStyles((theme) =>
  createStyles({
    Course: {
      maxWidth: '100%'
    },
    Course_media: {
      height: 220
    },
    Course_actions: {
      justifyContent: 'center'
    },
    Course_chips: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center'
    },
    Course_chip: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5)
    }
  })
)
