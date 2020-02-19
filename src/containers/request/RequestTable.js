import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Button } from '@material-ui/core'
import CustomDialog from '../../components/dialog/CustomDialog'
import { ACTION_TYPE } from '../../constants'
import { useHistory } from 'react-router-dom'
import palletes from '../../constants/palletes'
import { EnhancedTableHead } from './EnhancedTableHead'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy)
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

export default function RequestTable({ rows = [] }) {
  const history = useHistory()
  const classes = useStyles()

  const [data, setData] = React.useState(rows)

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('creator')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const [action, setAction] = React.useState(-1)

  const [openDialog, setOpenDialog] = React.useState(false)

  const [requestId, setRequestId] = React.useState(null)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleOpenDialog = (actionType, requestProjectId) => event => {
    setAction(actionType)
    setRequestId(requestProjectId)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setAction(-1)
    setOpenDialog(false)
  }

  const handleAgree = () => {
    if (action === ACTION_TYPE.AGREE) {
      history.push(`requests/join/${requestId}`)
    } else {
      setData(data.filter(item => item.id !== requestId))
      setOpenDialog(false)
      console.log('Delete')
    }
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  return (
    <div className={classes.root}>
      <CustomDialog
        open={openDialog}
        title={action === ACTION_TYPE.AGREE ? 'Join Project' : 'Reject Project'}
        content={`Are you sure to ${
          action === ACTION_TYPE.AGREE ? 'join' : 'reject'
        } a project`}
        handleClose={handleCloseDialog}
        handleAgree={handleAgree}
      />
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell component="th" id={labelId} scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>
                        <Button
                          style={{ margin: '0px 8px' }}
                          color="primary"
                          variant="outlined"
                          onClick={handleOpenDialog(ACTION_TYPE.AGREE, row.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={handleOpenDialog(
                            ACTION_TYPE.DISAGREE,
                            row.id
                          )}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
