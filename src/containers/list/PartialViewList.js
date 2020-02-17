import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import InboxIcon from '@material-ui/icons/Inbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import { Typography, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}))

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />
}

export default function PartialViewList({ data }) {
  const classes = useStyles()
  const { fileName, totalRow } = data
  return (
    // <div className={classes.root}>
    <Grid container>
      <Grid item xs={6}>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={`Data Name: ${fileName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Data Size: ${totalRow}`} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  )
}
