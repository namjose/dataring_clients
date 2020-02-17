import React from 'react'
import { connect, useSelector } from 'react-redux'
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
import AdminPaperbase from './containers/admin-home/AdminPaperbase'

const theme = createMuiTheme({
  spacing: 8,
  typography: {
    fontFamily: 'Roboto'
  }
})

function App() {
  const { loggedIn, user } = useSelector(state => state.auth)
  const isAdmin = user ? user.isAdmin : false
  console.log(user)
  return (
    <Router basename={`${isAdmin ? 'admin' : ''}`}>
      <StylesProvider injectFirst>
        <DialogContextProvider>
          <Switch>
            <PrivateRoute
              auth={!loggedIn}
              path="/signUp"
              component={SignUp}
              // redirectTo={`${isAdmin ? '/admin' : '/'}`}
            />
            <PrivateRoute
              auth={!loggedIn}
              path="/signIn"
              component={SignIn}
              // redirectTo={`${isAdmin ? '/admin' : '/'}`}
            />
            {isAdmin ? (
              <PrivateRoute
                auth={loggedIn}
                path="/"
                component={AdminPaperbase}
                redirectTo="/signIn"
              />
            ) : (
              <PrivateRoute
                auth={loggedIn}
                path="/"
                component={Paperbase}
                redirectTo="/signIn"
              />
            )}
          </Switch>
        </DialogContextProvider>
      </StylesProvider>
    </Router>
  )
}

export default App
