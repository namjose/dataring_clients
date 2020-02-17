import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TEST_QUERY_HEADER, ADMIN_QUERY_HEADER } from '../../constants'
import { Button } from '@material-ui/core'
import { capitlizeString, getStatus } from '../../utils/formatString'
import apiTestFunc from '../../api/apiTestFunc'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function AdminQueryTable({ data = [], handleMakeVector }) {
  const history = useHistory()
  const classes = useStyles()

  const rows = data

  const renderMakeVector = (id, isQueryVectorReady) => {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={isQueryVectorReady}
        onClick={handleMakeVector && handleMakeVector(id)}
      >
        Make
      </Button>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {ADMIN_QUERY_HEADER.map((item, index) => {
              return (
                <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                  {item}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            const { isQueryVectorReady, id, truthEncodeAnswer } = row
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">
                  {renderMakeVector(id, isQueryVectorReady)}
                </TableCell>
                <TableCell align="right">
                  {getStatus(isQueryVectorReady, truthEncodeAnswer, false)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
