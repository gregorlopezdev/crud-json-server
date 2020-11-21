import { Alert, AlertTitle } from '@material-ui/lab'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const Notfound = () => {
  const classes = useStyles()

  return (
    <Alert className={classes.Notfound} severity='error'>
      <AlertTitle>Error 404</AlertTitle>
      Page not found - <strong>try again with another route!</strong>
    </Alert>
  )
}

export default Notfound

const useStyles = makeStyles((theme) =>
  createStyles({
    Notfound: {
      maxWidth: '500px',
      margin: '0 auto'
    }
  })
)
