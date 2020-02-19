import React, { useEffect, useState, useReducer } from 'react'
import { Grid, Typography } from '@material-ui/core'
import SimpleTable from '../table/SimpleTable'
import apiQuery from '../../api/apiQuery'
import { useSelector } from 'react-redux'
import formatting from '../../utils/formatting'
import { queryListHead, queryListData } from '../../constants/mockupData'
import { QUERY_LIST_HEADER, QUERY_LIST_HEADER_2 } from '../../constants'
import { useHistory } from 'react-router-dom'
import apiTestFunc from '../../api/apiTestFunc'

const initialState = {
  myQueries: [],
  recQueries: [],
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, loading: true }

    case 'FETCH_DATA_SUCCESSFUL': {
      const { myQueries, recQueries } = action.payload
      return { ...state, loading: false, myQueries, recQueries }
    }

    case 'FETCH_DATA_FAILED': {
      return { ...state, loading: false }
    }

    default:
      return state
  }
}

const QueryList = ({ project }) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState)
  const user = useSelector(state => state.auth.user)

  const onRowClick = (queryId, creatorId) => event => {
    if (creatorId === user.id) {
      history.push(`/queries/${queryId}`)
    } else {
      history.push(`/queries/receive/${queryId}`)
    }
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA' })
    Promise.all([
      apiQuery.getQueriesByPair(user.id, project.id),
      apiTestFunc.getTestFuncByPair(user.id, project.id)
    ])
      .then(res => {
        const [resQ, resT] = res
        const { data: dataQ } = resQ
        const { data: dataT } = resT
        const formatData0 = formatting.formatData(dataQ)
        const formatDataT = formatting.formatDataFromAPI(dataT)

        const mergeData = [...formatData0, ...formatDataT]

        const myQueries = mergeData.filter(item => item.creatorId === user.id)
        const recQueries = mergeData.filter(
          item => item.receiverId === user.id && item.isQueryVectorReady
        )

        console.log({ myQueries, recQueries })
        dispatch({
          type: 'FETCH_DATA_SUCCESSFUL',
          payload: { myQueries, recQueries }
        })
      })
      .catch(() => {
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }, [])

  const { myQueries, recQueries, loading } = state
  console.log({ myQueries })
  return (
    <Grid container>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">My Query List</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '24px 0px' }}>
        {myQueries.length ? (
          <SimpleTable
            headCells={QUERY_LIST_HEADER}
            data={myQueries}
            onRowClick={onRowClick}
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
        style={{ marginTop: 48 }}
      >
        <Typography variant="h5">Partner's Query List</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '24px 0px' }}>
        {recQueries.length ? (
          <SimpleTable
            headCells={QUERY_LIST_HEADER_2}
            data={recQueries}
            onRowClick={onRowClick}
            otherQuery
          />
        ) : (
          <Typography>No results</Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default QueryList
