import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsIcon from '@material-ui/icons/Directions'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '60%',
    marginTop: 12
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}))

export default function CustomTextfield({
  label,
  numeric,
  value,
  setValue,
  onChange
}) {
  const classes = useStyles()

  return (
    <Paper component="form" className={classes.root}>
      <div className={classes.iconButton} aria-label="menu">
        <Typography>{label}</Typography>
      </div>
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        type={numeric ? 'number' : 'text'}
        className={classes.input}
        value={value}
        onChange={onChange}
        // placeholder="Search Google Maps"
        // inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Paper>
  )
}
