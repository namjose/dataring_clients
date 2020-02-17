import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ReactFileReader from 'react-file-reader'
import Papa from 'papaparse'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import CustomTabs from '../../components/tabs/CustomTabs'
import { USER_PROJECT_TAB } from '../../constants'
import apiProject from '../../api/apiProject'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMetaAction } from '../../actions/metaActions'
import baseAxios from '../../api/baseAxios'
import apiPV from '../../api/apiPV'
import ProjectTabs from './ProjectTabs'

const styles = theme => ({
  paper: {
    // maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  dashBoardWrapper: {
    margin: '40px 16px'
  },
  listHeader: {
    display: 'flex'
  },
  createButton: {
    marginLeft: 6
  },
  listContainer: {
    margin: 0,
    marginTop: 12
  }
})
const LIMIT = 10000

function AdminProjectDetail(props) {
  const { classes } = props
  const dispatch = useDispatch()

  const [project, setProject] = React.useState(null)
  const user = useSelector(state => state.auth.user)

  const projectId = props.match.params.id

  useEffect(() => {
    projectId &&
      apiProject
        .getProjectById(projectId)
        .then(res => {
          const { data } = res
          const formatData = {
            id: data.stringId,
            title: data.title,
            desc: data.desc,
            creatorName: data.creatorName,
            projectStatus: data.projectStatus,
            collaborators: data.collaborators,
            creatorId: data.creatorId
          }
          // console.log({ formatData })
          setProject(formatData)
        })
        .catch(e => console.log(e))
  }, [])

  console.log({ project })

  return project ? (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} style={{ padding: '12px 0px' }}>
            <Grid item xs>
              <Typography>Project Detail</Typography>

              <Typography variant="subtitle2">{project.title}</Typography>
            </Grid>
            <Grid item xs style={{ textAlign: 'right' }}>
              <Typography>Status: Ready</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.dashBoardWrapper}>
        <ProjectTabs {...{ project }} />
      </div>
    </Paper>
  ) : null
}

export default withStyles(styles)(AdminProjectDetail)
