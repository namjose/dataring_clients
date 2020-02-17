import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Grid, IconButton, Button } from '@material-ui/core'
import DetailCard from '../../components/card/DetailCard'
import { useHistory } from 'react-router-dom'
import apiQuery from '../../api/apiQuery'
import apiTestFunc from '../../api/apiTestFunc'
import formatting from '../../utils/formatting'
import AdminQueryCard from '../../components/card/AdminQueryCard'
import CreateTestDialog from '../../components/dialog/CreateTestDialog'

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
  ResultWrapper: {
    margin: '40px 24px'
  }
})

function AdminQueryDetail(props) {
  const { classes } = props
  const history = useHistory()

  const queryId = props.match.params.id

  const [detail, setDetail] = useState(null)

  useEffect(() => {
    fetchQueryDetail()
  }, [])

  const fetchQueryDetail = () => {
    Promise.all([apiQuery.getQueryDetailById(queryId)])
      .then(([resQ]) => {
        const { data: detailQ } = resQ
        const formatDetail = formatting.formatObjFromAPI(detailQ)
        setDetail({
          ...formatDetail
        })
      })
      .catch(e => console.log({ e }))
  }

  const [loading, setLoading] = useState(false)

  const handleVerify = id => event => {
    setLoading(true)
    apiTestFunc
      .verifyByTestId(id)
      .then(res => {
        setLoading(false)
        fetchQueryDetail()
      })
      .catch(() => {
        alert('Error ! Can not verify')
        setLoading(false)
      })
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography>Query Detail</Typography>
            </Grid>
            {/* <Grid item>
              <IconButton onClick={handleDeleteQuery}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.ResultWrapper}>
        <Grid container>
          {detail && (
            <AdminQueryCard
              detail={detail}
              handleVerify={handleVerify}
              loading={loading}
              handleClickOpen={handleClickOpen}
            />
          )}
        </Grid>
      </div>
      <CreateTestDialog open={open} handleClose={handleClose} />
    </Paper>
  )
}

export default withStyles(styles)(AdminQueryDetail)
