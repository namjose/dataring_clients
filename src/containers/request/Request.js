import React, { useReducer, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import RequestTable from './RequestTable'
import apiRequest from '../../api/apiRequest'
import { useSelector } from 'react-redux'

const styles = theme => ({
  paper: {
    // maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  ResultWrapper: {
    margin: '40px 24px'
  }
})

const initialState = {
  requests: [],
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA': {
      return { ...state, loading: true }
    }

    case 'FETCH_DATA_SUCCEEDED': {
      const { requests } = action.payload
      return { ...state, requests: requests, loading: false }
    }

    case 'FETCH_DATA_FAILED': {
      return { ...state, loading: false, requests: [] }
    }

    default: {
      return state
    }
  }
}

function Request(props) {
  const { classes } = props
  const user = useSelector(state => state.auth.user)

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (user && user.id) {
      dispatch({ type: 'FETCH_DATA' })
      apiRequest
        .getRequestById(user.id)
        .then(res => {
          const { data } = res
          const requests = data.map(item => {
            return {
              id: item.stringId,
              name: item.creatorName,
              title: item.title
            }
          })
          dispatch({ type: 'FETCH_DATA_SUCCEEDED', payload: { requests } })
        })
        .catch(e => {
          dispatch({ type: 'FETCH_DATA_FAILED' })
        })
    }
  }, [user])

  const { requests, loading } = state
  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography>Request</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.ResultWrapper}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <RequestTable rows={requests} />
        )}
      </div>
    </Paper>
  )
}

export default withStyles(styles)(Request)
