import React from 'react'
import clsx from 'clsx'
import {
  Grid,
  Typography,
  Button,
  Theme,
  createStyles,
  withStyles,
  Divider,
  Icon,
  TextField,
  InputAdornment,
  IconButton,
  Link
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import baseAxios, { BASE_URL } from '../../api/baseAxios'
import { signInSuccesful, signInRejected } from '../../actions/authActions'
import { connect } from 'react-redux'
import { apiAuth } from '../../api'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: 500,
      width: '100%',
      paddingTop: 50
    },
    title: {
      fontSize: 20,
      fontWeight: 600
    },
    title__small: {
      fontSize: 14,
      fontWeight: 600
    },
    card: {
      borderRadius: 4,
      padding: 50,
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)'
    },
    button: {
      minHeight: 56
    },
    description: {
      fontWeight: 450,
      color: '#333',
      fontSize: 13
    },
    divider: {
      margin: '20px 0'
    },
    icon: {
      marginRight: 2
    },
    typography: {
      fontWeight: 'bold'
    },
    formControl: {
      minWidth: 150,
      maxWidth: 500
    },
    leftIcon: {
      marginRight: theme.spacing(1)
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    arrowIcon: {
      marginLeft: theme.spacing(1)
    },
    dividerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      marginBottom: 20
    }
  })

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      displayName: '',
      showPassword: false
    }
  }

  _handleClickShowPassword = () => {
    this.setState(prevState => {
      this.setState({ showPassword: !prevState.showPassword })
    })
  }

  _handleChange = event => {
    const { name, value } = event.target
    const length = value.trim().length
    this.setState(prevState => {
      this.setState({ [name]: value })
    })
  }

  _handleSubmit = event => {
    event.preventDefault()

    const { signInSuccesful, signInRejected } = this.props

    const { email, password } = this.state
    if (email && password) {
      fetch(`${BASE_URL}/user/signIn`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        })
      })
        .then(res => res.json())
        .then(data => {
          // console.log({ data })
          console.log({ data })
          if (data.id) {
            const { stringId, email, username, isAdmin } = data
            const user = { id: stringId, email, username, isAdmin }
            signInSuccesful(user)
          } else {
            signInRejected()
          }

          // this.props.history.push('/')
        })
        .catch(e => {
          console.log(e)
          signInRejected()
        })
    }
  }

  render() {
    const { classes } = this.props
    const { displayName, email, password, showPassword } = this.state
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid
          item
          xs={4}
          justify="center"
          alignItems="center"
          className={classes.card}
        >
          <form onSubmit={this._handleSubmit}>
            <Typography align="center" className={classes.title}>
              Sign in
            </Typography>
            <TextField
              label="Your email"
              value={email}
              name="email"
              margin="normal"
              variant="outlined"
              fullWidth
              onChange={this._handleChange}
            />
            <br />
            <TextField
              name="password"
              margin="normal"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={password}
              onChange={this._handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={this._handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <br />
            <br />
            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              SIGN IN
            </Button>
            <div style={{ paddingTop: 20 }}>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Link href="/signUp" underline="none" color="inherit">
                  <Typography>Register new account</Typography>
                </Link>
              </div>
            </div>
          </form>
        </Grid>
      </Grid>
    )
  }
}

// const mapStateToProps = (state) => ({

// })

const mapDispatchToProps = {
  signInSuccesful,
  signInRejected
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn))
