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
import apiProject from '../../api/apiProject'
import { useSelector, useDispatch } from 'react-redux'
import { BASE_URL } from '../../api/baseAxios'
import { fetchProjectAction } from '../../actions/projectAction'
import { FETCH_PROJECT } from '../../constants/actionTypes'

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

function Projects(props) {
  const { classes } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const context = useContext(DialogContext)
  const { handleOpen, handleClose, open } = context

  const { user } = useSelector(state => state.auth)
  const userId = user ? user.id : null

  const projectState = useSelector(state => state.projectReducer)

  const { projects } = projectState
  // console.log({ projects })

  const [searchText, setSearchText] = React.useState('')

  // useEffect(() => {
  //   !projects.length && handleOpen()
  // }, [])

  useEffect(() => {
    dispatch(fetchProjectAction(userId))
  }, [])

  const handleAgree = () => {
    handleClose()
    history.push('/projects/create')
  }

  const handleClickCreate = () => {
    history.push('/projects/create')
  }

  const handleChange = event => {
    const search = event.target.value
    setSearchText(search)
  }

  console.log({ projects })

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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography>Data Sharing Projects</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.dashBoardWrapper}>
        <Grid container>
          <Grid className={classes.listHeader} item xs={12}>
            <SearchBar searchText={searchText} handleChange={handleChange} />
            <Button
              variant="contained"
              className={classes.createButton}
              color="primary"
              onClick={handleClickCreate}
            >
              Create
            </Button>
          </Grid>
          <Grid
            item
            container
            xs={12}
            className={classes.listContainer}
            spacing={2}
          >
            {projects.map(item => (
              <Grid key={item.id} item sm={6} md={4} lg={3}>
                <CustomCard {...{ item }} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(Projects)
