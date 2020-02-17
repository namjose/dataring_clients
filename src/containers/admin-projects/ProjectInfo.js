import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
export const ProjectInfo = ({ title, desc, creatorName, collaborators }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Project Information</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '12px 0px' }}>
        <Typography variant="h6">Project Title</Typography>
        <Typography variant="body1">{title}</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '12px 0px' }}>
        <Typography variant="h6">Project Description</Typography>
        <Typography variant="body1">{desc}</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '12px 0px' }}>
        <Typography variant="h6">Creator</Typography>
        <Typography variant="body1">{creatorName}</Typography>
      </Grid>
      <Grid item xs={12} style={{ margin: '12px 0px' }}>
        <Typography variant="h6">Total Collaborators</Typography>
        <Typography variant="body1">{collaborators.length + 1}</Typography>
      </Grid>
    </Grid>
  )
}
