import React, { useEffect, useState, useReducer } from 'react'
import { Grid, Typography } from '@material-ui/core'
import SimpleTable from '../table/SimpleTable'
import apiQuery from '../../api/apiQuery'
import { useSelector } from 'react-redux'
import formatting from '../../utils/formatting'
import {
  AdminQueryListHead,
  AdminQueryListData
} from '../../constants/mockupData'
import { QUERY_LIST_HEADER, QUERY_LIST_HEADER_2 } from '../../constants'
import { useHistory } from 'react-router-dom'
import apiTestFunc from '../../api/apiTestFunc'
import QueryCard from '../card/QueryCard'

const initialState = {
  queries: [],
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, loading: true }

    case 'FETCH_DATA_SUCCESSFUL': {
      const { queries } = action.payload
      return { ...state, loading: false, queries }
    }

    case 'FETCH_DATA_FAILED': {
      return { ...state, loading: false }
    }

    default:
      return state
  }
}

const AdminQueryList = ({ project }) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState)
  const user = useSelector(state => state.auth.user)

  console.log({ project })

  const projectId = project.id
  const { creatorId, collaborators } = project
  const clusterArray = []
  collaborators.forEach(collabId => {
    clusterArray.push({
      creatorId: creatorId,
      receiverId: collabId,
      id: `${creatorId}-${collabId}-${projectId}`
    })
  })

  return (
    <Grid container>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Query List</Typography>
      </Grid>
      <Grid item container xs={12} style={{ margin: '24px 0px' }}>
        {clusterArray.map((item, index) => {
          return (
            <Grid key={item.receiverId} item sm={6} md={4} lg={3}>
              <QueryCard item={item} index={index} />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default AdminQueryList
