import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Chip
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Block, Check } from '@material-ui/icons'

import { useHistory } from 'react-router-dom'

const UCard = ({ course, disabled }) => {
  const classes = useStyles()
  const history = useHistory()

  const onNavigate = (id) => {
    history.push(`/courses/${id}`)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => disabled || onNavigate(course.id)}>
        <CardMedia
          className={classes.media}
          image={course.poster || 'https://via.placeholder.com/500'}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {course.name || 'Untitle'}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
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
        <Button size='small' color='primary' disableRipple={true}>
          Price: ${course.price}
        </Button>
      </CardActions>
    </Card>
  )
}

export default UCard

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '100%'
    },
    media: {
      height: 220
    },
    u_actions: {
      justifyContent: 'center'
    },
    u_chip: {
      width: '100%',
      marginTop: theme.spacing(2)
    }
  })
)
