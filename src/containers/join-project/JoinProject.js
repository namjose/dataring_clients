import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import CustomStepper from '../../components/stepper/CustomStepper'
import { TextField } from '@material-ui/core'
import { projectRequest } from '../../constants/mockupData'
import ReactFileReader from 'react-file-reader'
import ContentList from '../list/ContentList'
import baseAxios, { BASE_URL } from '../../api/baseAxios'
import apiRequest from '../../api/apiRequest'

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
  JoinProjectWrapper: {
    margin: '40px 16px'
  },
  listHeader: {
    display: 'flex'
  },
  createButton: {
    marginLeft: 6
  },
  listContainer: {
    margin: 0
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 24
  },
  inputStyle: {
    margin: '12px 0px'
  }
})

function getSteps() {
  return ['Uload Metadata']
}

const init_metaData = {
  dataName: '',
  totalRow: 0,
  totalCol: 0,
  columnLabels: [],
  pv_ratio: 0.01,
  epsilon: 0.5,
  sensitivity: 1.0,
  prob: 0.95,
  scale_up: 2
}

function JoinProject({ classes, projectReq = projectRequest, match }) {
  const history = useHistory()

  const [metaData, setMetaData] = useState(init_metaData)
  const [fileName, setFileName] = useState('')

  const [activeStep, setActiveStep] = React.useState(0)

  const steps = getSteps()

  const handleFiles = files => {
    const jsonFile = files[0]
    var readFile = new FileReader()
    readFile.onload = e => {
      const { name } = jsonFile
      var contents = e.target.result
      var json = JSON.parse(contents)
      const newMeta = { ...json }

      setFileName(name)
      setMetaData(prevMeta => ({ ...prevMeta, ...newMeta }))
    }

    readFile.readAsText(jsonFile)
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      submitForm(metaData)
      // history.push('/projects')
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const submitForm = data => {
    const { id } = match.params
    console.log({ data })

    // baseAxios
    //   .put(`/projectRequest?requestId=${id}&status=true`, {
    //     data
    //   })

    apiRequest
      .acceptRequest(id, data)
      .then(resJson => {
        console.log({ resJson })
        history.push('/projects')
      })
      .catch(e => console.log(e))
  }

  const handleBack = () => {
    console.log({ activeStep })
    switch (activeStep) {
      case 0: {
        // setForm({ ...form, dataName: '', totalRow: 0, totalCol: 0 })
        break
      }
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid item container justify="center" xs={12}>
            <Grid item container alignItems="center" justify="center" xs={12}>
              <Grid item xs={8} md={10}>
                <TextField
                  value={fileName}
                  // label="Upload MetaData JSON File"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={4} md={2} style={{ paddingLeft: 12 }}>
                <ReactFileReader handleFiles={handleFiles} fileTypes=".json">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ height: '100%' }}
                  >
                    Upload Metadata
                  </Button>
                </ReactFileReader>
              </Grid>
              <Grid item xs={12} container>
                {metaData.dataName && <ContentList {...{ metaData }} />}
              </Grid>
            </Grid>
          </Grid>
        )

      default:
        break
    }
  }

  const getDisableStatus = () => {
    switch (activeStep) {
      case 0: {
        return !metaData.dataName
      }
      default:
        return false
    }
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
              <Typography>Data Sharing Projects</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.JoinProjectWrapper}>
        <Grid container>
          <Grid className={classes.listHeader} item xs={12}>
            <Typography variant="h6">Join Project</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomStepper {...{ activeStep, steps }} />
          </Grid>
          {renderStep()}
        </Grid>
      </div>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.footer}>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.footer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={getDisableStatus()}
              >
                {activeStep === steps.length - 1 ? 'Submit Request' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Paper>
  )
}

export default withStyles(styles)(JoinProject)
