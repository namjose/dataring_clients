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
import CollaboratorCard from '../../components/card/CollaboratorCard'
import { COLLABORATOR_TYPE } from '../../constants'
import CustomTable from '../../components/table/CustomTable'
import { FabAddIcon } from '../../components/fab-button/FabButton'
import { projectRequest } from '../../constants/mockupData'

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

const collaboratorTypes = ['Public Collaborator', 'Private Collaborator']

function getSteps() {
  return ['Enter Metadata', 'Edit Configuration']
}

function JoinProject({ classes, projectReq = projectRequest }) {
  const history = useHistory()

  const [form, setForm] = React.useState({
    dataName: '',
    totalRow: 0,
    totalCol: 0,
    factor: 0,
    ratio: 0.0,
    epsilon: 0.0
  })

  useEffect(() => {
    setForm({ ...form, ...projectRequest })
  }, [])

  const [activeStep, setActiveStep] = React.useState(0)

  const steps = getSteps()

  const handleChange = name => event => {
    setForm({ ...form, [name]: event.target.value })
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      //   console.log({ ...form, selected, privateArray, collaType })
      //   const project = {
      //     ...form
      //   }
      history.push('/')
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    console.log({ activeStep })
    switch (activeStep) {
      case 0: {
        setForm({ ...form, dataName: '', totalRow: 0, totalCol: 0 })
        break
      }

      case 1: {
        setForm({ ...form, factor: 1, ratio: 0.001, epsilon: 0.95 })
        break
      }
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const renderStep = () => {
    const { dataName, totalRow, totalCol, factor, ratio, epsilon } = form
    switch (activeStep) {
      case 0:
        return (
          <Grid item container justify="center" xs={12}>
            <TextField
              required
              id="standard-required"
              label="Data Name"
              value={dataName}
              onChange={handleChange('dataName')}
              variant="outlined"
              style={{ width: '40%' }}
            />
            <TextField
              required
              label="Total Rows"
              variant="outlined"
              value={totalRow}
              onChange={handleChange('totalRow')}
              type="number"
              style={{ width: '20%', margin: '0px 12px' }}
              inputProps={{
                min: 0
              }}
            />
            <TextField
              required
              label="Total Columns"
              variant="outlined"
              value={totalCol}
              type="number"
              onChange={handleChange('totalCol')}
              style={{ width: '20%' }}
              inputProps={{
                min: 0
              }}
            />
          </Grid>
        )
        break

      case 1:
        return (
          <Grid item container justify="center" xs={12}>
            <TextField
              required
              id="standard-required"
              label="Scale Up Factor"
              value={factor}
              onChange={handleChange('factor')}
              variant="outlined"
              type="number"
              style={{ width: '40%' }}
              inputProps={{
                min: 0
              }}
            />
            <TextField
              required
              label="PV Ratio"
              variant="outlined"
              value={ratio}
              onChange={handleChange('ratio')}
              type="number"
              style={{ width: '20%', margin: '0px 12px' }}
              inputProps={{
                step: 0.001,
                min: 0
              }}
            />
            <TextField
              required
              label="Epsilon Value"
              variant="outlined"
              value={epsilon}
              type="number"
              onChange={handleChange('epsilon')}
              style={{ width: '20%' }}
              inputProps={{
                step: 0.01,
                min: 0
              }}
            />
          </Grid>
        )
        break

      default:
        break
    }
  }

  const getDisableStatus = () => {
    const { dataName, totalRow, totalCol, factor, ratio, epsilon } = form

    switch (activeStep) {
      case 0: {
        return !(dataName && totalRow && totalCol)
      }

      case 1: {
        return !(factor && ratio && epsilon)
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
            <Typography variant="h6">Create Project</Typography>
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
