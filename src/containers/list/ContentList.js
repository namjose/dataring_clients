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

export default function ContentList({ metaData }) {
  const classes = useStyles()
  const {
    dataName,
    totalRow,
    totalCol,
    columnLabels,
    pv_ratio,
    epsilon,
    sensitivity,
    prob,
    scale_up
  } = metaData
  let labels = ''

  columnLabels.forEach((label, idx) => {
    if (idx !== columnLabels.length - 1) {
      labels = labels + label + ', '
    } else {
      labels += label
    }
  })

  return (
    // <div className={classes.root}>
    <Grid container>
      <Grid item xs={6}>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={`Data Name: ${dataName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Data Size: ${totalRow}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Total Columns: ${totalCol}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Column Labels" secondary={labels} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary="Partial View Ratio: " secondary={pv_ratio} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Epsilon: " secondary={epsilon} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Partial View Ratio: "
              secondary={sensitivity}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Prob: " secondary={prob} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Scale Up Value: " secondary={scale_up} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
    // </div>
  )
}
