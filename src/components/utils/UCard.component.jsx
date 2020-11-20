import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
// import { Search, Menu } from '@material-ui/icons'

const UCard = ({ course }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={course.url_poster}
          title={course.name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {course.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button size='small' color='primary'>
          Precio: {course.price}$
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
      height: 160
    },
    actions: {
      justifyContent: 'center'
    }
  })
)
