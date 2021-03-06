import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableRow: {
    cursor: 'pointer'
  }
})

export default function CollabTable({ data = [], headCells = [], onRowClick }) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headCells.map((cell, idx) => (
              <TableCell key={idx} align={idx === 0 ? 'left' : 'right'}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const columns = []
            Object.entries(row).forEach(([key, value]) => {
              columns.push(value)
            })
            return (
              <TableRow
                className={classes.tableRow}
                hover
                onClick={onRowClick && onRowClick(row.id)}
                key={index}
              >
                {columns.map((col, idx) => (
                  <TableCell align={idx === 0 ? 'left' : 'right'}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
