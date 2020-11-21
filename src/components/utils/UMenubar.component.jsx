import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  InputBase
} from '@material-ui/core'
import { createStyles, fade, makeStyles } from '@material-ui/core/styles'
import { Search, Menu } from '@material-ui/icons'

import { useHistory } from 'react-router-dom'
// import PropTypes from 'prop-types'

const UMenubar = () => {
  const classes = useStyles()
  const history = useHistory()

  const onNavigate = (to) => {
    history.push(to)
  }

  return (
    <div className={classes.Menubar}>
      <AppBar position='static'>
        <Toolbar className={classes.Menubar_toolbar}>
          <IconButton
            onClick={() => onNavigate('/')}
            edge='start'
            className={classes.Menubar_menuButton}
            color='inherit'>
            <Menu />
          </IconButton>
          <Typography
            className={classes.Menubar_title}
            variant='h6'
            component='h2'
            noWrap>
            CRUD for EDteam
          </Typography>
          <Button onClick={() => onNavigate('/')} color='inherit'>
            Home
          </Button>
          <Button onClick={() => onNavigate('/add')} color='inherit'>
            Add course
          </Button>
          <div className={classes.Menubar_search}>
            <div className={classes.Menubar_searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

// UMenubar.propTypes = {}

export default UMenubar

const useStyles = makeStyles((theme) =>
  createStyles({
    Menubar: {
      flexGrow: 1
    },
    Menubar_toolbar: {
      maxWidth: `${theme.breakpoints.values.lg}px`,
      width: `${theme.breakpoints.values.lg}px`,
      margin: '0 auto'
    },
    Menubar_menuButton: {
      marginRight: theme.spacing(2)
    },
    Menubar_title: {
      flexGrow: 1
    },
    Menubar_search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: theme.spacing(1),
      width: 'auto'
    },
    Menubar_searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  })
)
