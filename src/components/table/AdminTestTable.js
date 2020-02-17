import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TEST_QUERY_HEADER } from '../../constants'
import { Button } from '@material-ui/core'
import { capitlizeString } from '../../utils/formatString'
import apiTestFunc from '../../api/apiTestFunc'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function AdminTestTable({
  data = [],
  handleMakeVectorTest,
  handleVerify
}) {
  const history = useHistory()
  const classes = useStyles()

  const rows = data
  console.log({ rows })

  const renderVerifyButton = (id, encodeCipherAnswer, verified) => {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={!encodeCipherAnswer}
        onClick={handleVerify && handleVerify(id)}
      >
        Verify
      </Button>
    )
  }

  const renderMakeVector = (id, isQueryVectorReady) => {
    return (
      <Button
        variant="contained"
        color="primary"
        disabled={isQueryVectorReady}
        onClick={handleMakeVectorTest && handleMakeVectorTest(id)}
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
            {TEST_QUERY_HEADER.map((item, index) => {
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
            const { isQueryVectorReady, encodeCipherAnswer, id, verified } = row
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.type + 1}</TableCell>
                <TableCell align="right">
                  {renderMakeVector(id, isQueryVectorReady)}
                </TableCell>
                <TableCell align="right">
                  {renderVerifyButton(id, encodeCipherAnswer, verified)}
                </TableCell>
                <TableCell align="right">
                  {capitlizeString(row.verified)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
