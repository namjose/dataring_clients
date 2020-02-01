import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import SearchBar from '../../components/searchBar/SearchBar'
import CustomCard from '../../components/card/CustomCard'
import { projectList } from '../../constants/mockupData'
import CustomDialog from '../../components/dialog/CustomDialog'
import { DialogContext } from '../../contexts/dialogContext'
import CustomTabs from '../../components/tabs/CustomTabs'
import { USER_PROJECT_TAB } from '../../constants'

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

function ProjectDetail(props) {
  const { classes } = props
  const history = useHistory()
  const context = useContext(DialogContext)
  const { handleOpen, handleClose, open } = context

  useEffect(() => {
    !projectList.length && handleOpen()
  }, [])

  const handleAgree = () => {
    handleClose()
    history.push('/projects/create')
  }

  const handleClickCreate = () => {
    history.push('/projects/create')
  }

  return (
    <Paper className={classes.paper}>
      <CustomDialog
        {...{ open, handleClose, handleAgree }}
        title="Create Project"
        content="Do you want to start a new data sharing project"
      />
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

              <Typography variant="subtitle2">
                Part A, Part B and Part C - Public Data Exchange
              </Typography>
            </Grid>
            <Grid item xs style={{ textAlign: 'right' }}>
              <Typography>Status: Ready</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.dashBoardWrapper}>
        <CustomTabs tabLabels={USER_PROJECT_TAB} />
      </div>
    </Paper>
  )
}

export default withStyles(styles)(ProjectDetail)
