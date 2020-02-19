import React, { useEffect, useState, useReducer } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Grid, IconButton, Button, LinearProgress } from '@material-ui/core'
import DetailCard from '../../components/card/DetailCard'
import { useHistory } from 'react-router-dom'
import apiQuery from '../../api/apiQuery'
import apiTestFunc from '../../api/apiTestFunc'
import formatting from '../../utils/formatting'
import AdminQueryCard from '../../components/card/AdminQueryCard'
import CreateTestDialog from '../../components/dialog/CreateTestDialog'
import { QUERY_LIST_HEADER } from '../../constants'
import SimpleTable from '../../components/table/SimpleTable'
import QueryTestTab from '../../components/tabs/QueryTestTab'
import AdminTestTable from '../../components/table/AdminTestTable'
import AdminQueryTable from '../../components/table/AdminQueryTable'

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

const intialState = {
  queryList: [],
  testList: [],
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA': {
      return { ...state, loading: true }
    }
    case 'FETCH_DATA_DONE': {
      const { queryList, testList } = action.payload
      return {
        ...state,
        queryList,
        testList,
        loading: false
      }
    }

    case 'FETCH_DATA_FAILED': {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state
  }
}

function QueryGroup(props) {
  const { classes } = props
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, intialState)

  const listId = props.match.params.listId

  const split = listId.split('-')
  const [creatorId, receiverId, projectId] = split
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Promise.all([
      apiTestFunc.getTestFuncByUsers(creatorId, receiverId, projectId),
      apiQuery.getQueriesByUsers(creatorId, receiverId, projectId)
    ])
      .then(([resT, resQ]) => {
        const { data: dataT } = resT
        const { data: dataQ } = resQ
        const formatDataT = formatting.formatDataFromAPI(dataT)
        const formatDataQ = formatting.formatData(dataQ)
        dispatch({
          type: 'FETCH_DATA_DONE',
          payload: { queryList: formatDataQ, testList: formatDataT }
        })
      })
      .catch(e => {
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const handleMakeVectorTest = id => event => {
    dispatch({ type: 'FETCH_DATA' })

    apiTestFunc
      .makeVector(id)
      .then(res => {
        fetchData()
      })
      .catch(() => {
        alert('User have not uploaded Partial View')
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const handleMakeVector = id => event => {
    dispatch({ type: 'FETCH_DATA' })
    apiQuery
      .makeVector(id)
      .then(res => {
        fetchData()
      })
      .catch(() => {
        alert('User have not uploaded Partial View')
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const handleVerify = id => event => {
    dispatch({ type: 'FETCH_DATA' })
    apiTestFunc
      .verifyByTestId(id)
      .then(res => {
        fetchData()
      })
      .catch(() => {
        alert('Error ! Can not verify')
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const reProcessAllQuery = () => {
    const { queryList } = state

    const requestArray = queryList.map(item => {
      return apiQuery.reProcessAnswer(item.id)
    })

    dispatch({ type: 'FETCH_DATA' })
    Promise.all(requestArray)
      .then(() => {
        fetchData()
      })
      .catch(e => {
        alert('Error ! Can not re process answer')
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const createTestFunction = (creatorId, receiverId, type) => event => {
    dispatch({ type: 'FETCH_DATA' })
    apiTestFunc
      .createTestFunction({
        projectId,
        creatorId,
        receiverId,
        type
      })
      .then(res => {
        fetchData()
      })
      .catch(e => dispatch({ type: 'FETCH_DATA_FAILED' }))
  }

  const getTabContent = tabIdx => {
    const { queryList, testList } = state

    const { creatorId, receiverId, creatorName, receiverName } =
      queryList.length > 0
        ? queryList[0]
        : { creatorId: 0, receiverId: 0, creatorName: '', receiverName: '' }

    const allTestVerified =
      testList.filter(item => item.verified === 'none').length === 0
    const allQueriesHaveAnswer =
      queryList.filter(item => !item.encodeCipherAnswer).length === 0

    switch (tabIdx) {
      case 0: {
        const queryListA = queryList.filter(
          item => item.creatorId === creatorId
        )
        const queryListB = queryList.filter(
          item => item.creatorId === receiverId
        )
        return (
          <Grid container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="space-between"
            >
              <Typography variant="h5">Query List</Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={!(allTestVerified && allQueriesHaveAnswer)}
                onClick={reProcessAllQuery}
              >
                Release Answer For All Queries
              </Button>
            </Grid>
            {queryListA.length > 0 && (
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="space-between"
              >
                <Typography variant="h6">
                  {creatorName} - {receiverName}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} style={{ margin: '24px 0px' }}>
              {queryListA.length > 0 ? (
                <AdminQueryTable
                  data={queryListA}
                  handleMakeVector={handleMakeVector}
                  // onRowClick={onRowClick}
                />
              ) : (
                <Typography>No results</Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="space-between"
            >
              {queryListB.length > 0 && (
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justify="space-between"
                >
                  <Typography variant="h6">
                    {receiverName} - {creatorName}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} style={{ margin: '24px 0px' }}>
              {queryListB.length > 0 ? (
                <AdminQueryTable
                  data={queryListB}
                  handleMakeVector={handleMakeVector}
                  // onRowClick={onRowClick}
                />
              ) : (
                <Typography>No results</Typography>
              )}
            </Grid>
          </Grid>
        )
      }
      case 1: {
        const listA = testList.filter(item => item.creatorId === creatorId)
        const listB = testList.filter(item => item.creatorId === receiverId)
        return (
          <Grid container>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="space-between"
            >
              <Typography variant="h5">Test Function List</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="space-between"
              style={{ marginTop: 24 }}
            >
              <Typography variant="h6">
                {creatorName} - {receiverName}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(creatorId, receiverId, 0)}
              >
                Create Test Function 1
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(creatorId, receiverId, 1)}
              >
                Create Test Function 2
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(creatorId, receiverId, 2)}
              >
                Create Test Function 3
              </Button>
            </Grid>

            <Grid item xs={12} style={{ margin: '24px 0px' }}>
              {listA.length ? (
                <AdminTestTable
                  headCells={QUERY_LIST_HEADER}
                  data={listA}
                  handleMakeVectorTest={handleMakeVectorTest}
                  handleVerify={handleVerify}
                  // onRowClick={onRowClick}
                />
              ) : (
                <Typography>No results</Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justify="space-between"
            >
              <Typography variant="h6">
                {receiverName} - {creatorName}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(receiverId, creatorId, 0)}
              >
                Create Test Function 1
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(receiverId, creatorId, 1)}
              >
                Create Test Function 2
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={createTestFunction(receiverId, creatorId, 2)}
              >
                Create Test Function 3
              </Button>
            </Grid>
            <Grid item xs={12} style={{ margin: '24px 0px' }}>
              {listB.length ? (
                <AdminTestTable
                  headCells={QUERY_LIST_HEADER}
                  data={listB}
                  handleMakeVectorTest={handleMakeVectorTest}
                  handleVerify={handleVerify}
                  // onRowClick={onRowClick}
                />
              ) : (
                <Typography>No results</Typography>
              )}
            </Grid>
          </Grid>
        )
      }
    }
  }

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
              <Typography>Query and Test Function</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.ResultWrapper}>
        {state.loading ? (
          <LinearProgress variant="query" />
        ) : (
          <QueryTestTab getTabContent={getTabContent} />
        )}
      </div>
    </Paper>
  )
}

export default withStyles(styles)(QueryGroup)
