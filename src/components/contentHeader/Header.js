import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Menu, MenuItem, ButtonBase } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { signOut } from '../../actions/authActions'
import { SIGN_OUT } from '../../constants/actionTypes'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  },
  headerContainer: {
    paddingTop: 18,
    paddingBottom: 18
  }
})

function Header({ classes, onDrawerToggle, headerTitle, user }) {
  const dispatch = useDispatch()
  console.log({ user })

  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleChange = event => {
    setAuth(event.target.checked)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logOut = () => {
    handleClose()
    dispatch(signOut())
  }

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid
            container
            spacing={1}
            alignItems="center"
            className={classes.headerContainer}
          >
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {headerTitle}
              </Typography>
            </Grid>
            <Grid item>
              {/* <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton> */}
              {auth && (
                <div>
                  <ButtonBase
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                  >
                    <AccountCircle /> &nbsp;&nbsp;
                    <Typography>Hi, {user.username}</Typography>
                  </ButtonBase>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component="a"
                      href={`/user/id/${user ? user.id : 1}`}
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

const mapStateToProps = getState => ({
  user: getState.auth.user
})

export default withStyles(styles)(connect(mapStateToProps)(Header))
