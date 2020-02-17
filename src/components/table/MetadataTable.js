import React, { useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button, LinearProgress } from '@material-ui/core'
import apiMeta from '../../api/apiMeta'
import formatting from '../../utils/formatting'
import { capitlizeString } from '../../utils/formatString'
import apiSampleVector from '../../api/apiSampleVector'
import apiPV from '../../api/apiPV'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function createData(
  id,
  dataName,
  totalRow,
  totalCol,
  columnLabels,
  isVectorReady,
  isPVReady,
  verified
) {
  return {
    id,
    dataName,
    totalRow,
    totalCol,
    columnLabels,
    isVectorReady,
    isPVReady,
    verified
  }
}

const rows = [
  createData(
    1,
    'Frozen yoghurt',
    159,
    5,
    ['Interest', 'Profit', 'Debt', 'Cost', 'FV'],
    false,
    false,
    'none'
  ),
  createData(
    2,
    'Ice cream sandwich',
    237,
    5,
    ['Interest', 'Profit', 'Debt', 'Cost', 'FV'],
    false,
    false,
    'none'
  )
]

const HEADER_METADATA = [
  'ID',
  'Name',
  'Size',
  'Columns',
  'Make Sample Vector',
  'Partial View Uploaded',
  'Verification'
]

const intialState = {
  metadataList: [],
  isLoading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA': {
      return { ...state, isLoading: true }
    }

    case 'FETCH_DATA_SUCCESSFUL': {
      const { metadataList } = action.payload
      return { ...state, isLoading: false, metadataList }
    }

    case 'FETCH_DATA_FAILED': {
      return { ...state, isLoading: false }
    }

    default:
      return state
  }
}

export default function MetadataTable({ project }) {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, intialState)

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA' })
    fetchData()
  }, [])

  const fetchData = () => {
    const projectId = project.id
    apiMeta
      .getMetaByProject(projectId)
      .then(res => {
        const { data } = res
        const formatData = formatting.formatData(data)
        dispatch({
          type: 'FETCH_DATA_SUCCESSFUL',
          payload: { metadataList: formatData }
        })
      })
      .catch(e => {
        console.log({ e })
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const handleMakeSVPress = metaId => event => {
    dispatch({ type: 'FETCH_DATA' })
    apiSampleVector
      .makeSampleVectorByMeta(metaId)
      .then(res => {
        fetchData()
      })
      .catch(e => {
        console.log({ e })
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const _hanldeVerifyPV = metaId => event => {
    dispatch({ type: 'FETCH_DATA' })
    apiPV
      .verifyPVByMeta(metaId)
      .then(res => {
        console.log({ res })
        fetchData()
      })
      .catch(e => {
        alert('Can not verify !!! Not found subset of known domain')
        dispatch({ type: 'FETCH_DATA_FAILED' })
      })
  }

  const renderButtonMakeSV = row => {
    const { id, isVectorReady } = row
    console.log({ row })
    return (
      <Button
        disabled={isVectorReady}
        variant="contained"
        color="primary"
        onClick={handleMakeSVPress(id)}
      >
        Create
      </Button>
    )
  }

  const renderVerifyButton = row => {
    const { id, isPVReady, verified } = row
    return (
      <Button
        disabled={isPVReady && verified !== 'none'}
        variant="contained"
        color="primary"
        onClick={_hanldeVerifyPV(id)}
      >
        Verify
      </Button>
    )
  }

  const { metadataList, isLoading } = state

  return !isLoading ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {HEADER_METADATA.map((item, index) => {
              return (
                <TableCell align={index > 0 ? 'right' : 'left'} key={item}>
                  {item}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {metadataList.map((row, index) => (
            <TableRow
              key={row.id}
              hover
              // onClick={onRowClick && onRowClick(id, creatorId)}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right">{row.dataName}</TableCell>
              <TableCell align="right">{row.totalRow}</TableCell>
              <TableCell align="right">{row.totalCol}</TableCell>
              <TableCell align="right">{renderButtonMakeSV(row)}</TableCell>
              <TableCell align="right">{renderVerifyButton(row)}</TableCell>
              <TableCell align="right">
                {capitlizeString(row.verified)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <LinearProgress variant="query" />
  )
}
