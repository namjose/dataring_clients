import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactFileReader from 'react-file-reader'
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
import PublicCollaboratorTable from '../../components/table/PublicCollaboratorTable'
import { FabAddIcon } from '../../components/fab-button/FabButton'
import ContentList from '../list/ContentList'
import { useSelector } from 'react-redux'
import apiProject from '../../api/apiProject'
import { BASE_URL } from '../../api/baseAxios'

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
  createProjectWrapper: {
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
  return [
    'Basic Information',
    'Upload Metadata',
    'Collaborator Type',
    'Choose Collaborator'
  ]
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

function CreateProject(props) {
  const { classes } = props
  const history = useHistory()
  const user = useSelector(state => state.auth.user)

  const [form, setForm] = React.useState({
    fileName: '',
    title: '',
    desc: ''
  })

  const [metaData, setMetaData] = useState(init_metaData)

  const [activeStep, setActiveStep] = React.useState(0)

  // Collaborator Type
  const [collaType, setCollaType] = React.useState(-1)
  const [privateArray, setPrivateArray] = React.useState([''])
  const [selected, setSelected] = React.useState([])

  const steps = getSteps()

  const handleChange = name => event => {
    setForm({ ...form, [name]: event.target.value })
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const { id, username } = user
      const submitProject = {
        creatorId: id,
        creatorName: username,
        title: form.title,
        desc: form.desc,
        collaborators: selected,
        creatorMetaData: {
          ...metaData
        }
      }
      submitForm(submitProject)
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const submitForm = submitProject => {
    console.log({ submitProject })

    fetch(`${BASE_URL}/project/add`, {
      method: 'POST',
      body: JSON.stringify(submitProject)
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson })
        history.push('/projects')
      })
      .catch(e => console.log(e))
  }

  const handleBack = () => {
    console.log({ activeStep })
    switch (activeStep) {
      case 1: {
        setMetaData(init_metaData)
        break
      }

      case 3: {
        setPrivateArray([''])
        setSelected([])
        setCollaType(-1)
        break
      }
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const hanldeChooseColType = index => {
    setCollaType(index)
    setActiveStep(activeStep + 1)
  }

  const handleAddPrivateID = () => {
    setPrivateArray([...privateArray, ''])
  }

  const hanldeChangePrivateID = idx => event => {
    const newPrivateArray = privateArray.map((item, index) => {
      if (index === idx) {
        return event.target.value
      }

      return item
    })

    setPrivateArray(newPrivateArray)
  }

  const handleFiles = files => {
    const jsonFile = files[0]
    var readFile = new FileReader()
    readFile.onload = e => {
      const { name } = jsonFile
      var contents = e.target.result
      var json = JSON.parse(contents)
      const newMeta = { ...json }

      setForm(prevForm => ({ ...prevForm, fileName: name }))
      setMetaData(prevMeta => ({ ...prevMeta, ...newMeta }))
    }

    readFile.readAsText(jsonFile)
  }

  const renderStep = () => {
    const { title, desc } = form
    switch (activeStep) {
      case 0:
        return (
          <Grid item xs={12}>
            <TextField
              required
              value={title}
              onChange={handleChange('title')}
              id="standard-required"
              label="Project Title"
              variant="outlined"
              style={{ width: '50%' }}
            />
            <TextField
              value={desc}
              onChange={handleChange('desc')}
              label="Project Description"
              variant="outlined"
              style={{ width: '80%', marginTop: 24 }}
            />
          </Grid>
        )

      case 1:
        return (
          <Grid item container alignItems="center" justify="center" xs={12}>
            <Grid item xs={8} md={10}>
              <TextField
                value={form.fileName}
                label="Upload MetaData JSON File"
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
        )

      case 2:
        return (
          <Grid item container justify="space-evenly" xs={12}>
            {collaboratorTypes.map((title, index) => (
              <CollaboratorCard
                key={index}
                {...{ title, hanldeChooseColType, index }}
              />
            ))}
          </Grid>
        )

      case 3:
        if (collaType === COLLABORATOR_TYPE.PRIVATE_COLLABORATOR) {
          return (
            <Grid item xs={12}>
              {privateArray.map((item, index) => {
                return (
                  <TextField
                    key={index}
                    required
                    id="standard-required"
                    label="Private Collaborator ID"
                    variant="outlined"
                    fullWidth
                    className={classes.inputStyle}
                    value={item}
                    onChange={hanldeChangePrivateID(index)}
                  />
                )
              })}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <FabAddIcon onClick={handleAddPrivateID} />
              </div>
            </Grid>
          )
        } else if (collaType === COLLABORATOR_TYPE.PUBLIC_COLLABORATOR) {
          return (
            <Grid item xs={12}>
              <PublicCollaboratorTable
                selected={selected}
                setSelected={setSelected}
              />
            </Grid>
          )
        } else {
          return null
        }
        break

      default:
        break
    }
  }

  const getDisableStatus = () => {
    const { title } = form
    switch (activeStep) {
      case 0: {
        return !title
      }
      case 1: {
        return !metaData.dataName
      }
      case 2: {
        return collaType === -1
      }
      case 3: {
        return !privateArray.length || !selected.length
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
      <div className={classes.createProjectWrapper}>
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

export default withStyles(styles)(CreateProject)
