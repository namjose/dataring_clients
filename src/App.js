import React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Theme, createStyles, withStyles } from '@material-ui/core'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import './App.scss'
import Paperbase from './containers/home/Paperbase'
import SignUp from './containers/authorization/SignUp'
import SignIn from './containers/authorization/SignIn'
import PrivateRoute from './routes/PrivateRoute'
import { DialogContextProvider } from './contexts/dialogContext'

const theme = createMuiTheme({
  spacing: 8,
  // palette: {
  //   primary: {
  //     main: pallete.primary_color
  //   },
  //   secondary: {
  //     main: '#f5f5f5'
  //   },
  //   text: {
  //     primary: 'rgba(0, 0, 0, 0.87)',
  //     secondary: 'rgba(0, 0, 0, 0.6)'
  //   }
  // },
  typography: {
    fontFamily: 'Roboto'
  }
})

localStorage.removeItem('auth')

function App() {
  const auth = localStorage.getItem('auth')
  return (
    <Router>
      <StylesProvider injectFirst>
        <DialogContextProvider>
          <Switch>
            <PrivateRoute auth={auth} path="/signUp" component={SignUp} />
            <PrivateRoute auth={auth} path="/signIn" component={SignIn} />
            <PrivateRoute
              auth={false}
              path="/"
              component={Paperbase}
              redirectTo="/signIn"
            />
          </Switch>
        </DialogContextProvider>
      </StylesProvider>
    </Router>
  )
}

const mapStateToProps = state => ({
  authReducer: state.authReducer
})

export default connect(mapStateToProps)(App)
