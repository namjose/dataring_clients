import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, TextField, Button, LinearProgress } from '@material-ui/core'
import { CSVLink, CSVDownload } from 'react-csv'
import ReactFileReader from 'react-file-reader'
import Papa from 'papaparse'
import axios from 'axios'
import ProgressBar from '../progress-bar/ProgressBar'
import VerticalStepper from '../stepper/VerticalStepper'
import { useSelector } from 'react-redux'
import ContentList from '../../containers/list/ContentList'
import PartialViewList from '../../containers/list/PartialViewList'
import { useHistory } from 'react-router-dom'
import { LIMIT_DOWNLOAD } from '../../constants'

const SAMPLE_VECTOR_HEADER = [{ label: 'CIPHERTEXT', key: 'ciphertext' }]

function getSteps() {
  return [
    'Download Sample Vector',
    'Upload Partial View',
    'Submit Partial View'
  ]
}

export const UploadPartialView = ({
  classes,
  sampleVectorState,
  handleFiles,
  partialViewState,
  submitPartialView,
  downloadOpt,
  handleChooseDownloadOpt,
  loadSampleVector
}) => {
  const history = useHistory()
  const { sampleVector, loadingSV, loadCount, totalSize } = sampleVectorState
  const metaData = useSelector(state => state.metaReducer)

  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  const [errorUpload, setErrorUpload] = React.useState('')

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      submitPartialView()
        .then(res => {
          // setActiveStep(3)
          history.push('/temp')
          history.goBack()
        })
        .catch(() => {
          setErrorUpload('Error ! Can not upload partial view')
        })
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
    history.push('/temp')
    history.goBack()
  }

  const csvLink = React.useRef()

  const handleDowload = () => {
    csvLink.current.link.click()
  }

  const download = () => {
    handleChooseDownloadOpt(true)
    loadSampleVector()
  }

  const skipDownload = () => {
    handleChooseDownloadOpt(false)
    setActiveStep(1)
  }

  const stepContent = index => {
    const percentValue =
      (loadCount / Math.floor(totalSize / LIMIT_DOWNLOAD)) * 100
    switch (index) {
      case 0: {
        return (
          <>
            {!downloadOpt && (
              <>
                <Typography>
                  Do you want to download sample vector for this projet ?
                </Typography>
                <div style={{ paddingTop: 12, paddingBottom: 24 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={download}
                  >
                    YES
                  </Button>
                  <Button
                    style={{ marginLeft: 12 }}
                    variant="contained"
                    color="primary"
                    onClick={skipDownload}
                  >
                    SKIP
                  </Button>
                </div>
              </>
            )}
            {loadingSV && downloadOpt && (
              <LinearProgress
                variant="determinate"
                value={percentValue}
                style={{ margin: '24px 0px' }}
              />
            )}
            {downloadOpt && (
              <>
                <Button
                  disabled={loadingSV}
                  variant="contained"
                  color="primary"
                  onClick={handleDowload}
                >
                  Download Sample Vector
                </Button>
                <CSVLink
                  data={sampleVector.map(row => ({ ciphertext: row }))}
                  filename="sample-vector.csv"
                  target="_blank"
                  ref={csvLink}
                  hidden
                  headers={SAMPLE_VECTOR_HEADER}
                />
              </>
            )}
          </>
        )
      }

      case 1: {
        return (
          <Grid container>
            <Grid item xs={12} lg={10}>
              <TextField
                value={partialViewState ? partialViewState.fileName : null}
                //   onChange={handleChange('desc')}
                label="Upload Partial View Histogram"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  style={{ height: '100%' }}
                >
                  Upload Partial View
                </Button>
              </ReactFileReader>
            </Grid>
            <Grid item xs={12} container>
              {partialViewState && partialViewState.fileName && (
                <PartialViewList data={partialViewState} />
              )}
            </Grid>
          </Grid>
        )
      }

      case 2: {
        return errorUpload ? (
          <Typography style={{ color: 'red' }}>{errorUpload}</Typography>
        ) : (
          errorUpload
        )
      }

      default: {
        return null
      }
    }
  }

  const getDisable = index => {
    switch (index) {
      case 0: {
        return !(metaData.isVectorReady && sampleVector.length)
      }

      case 1: {
        return !(partialViewState && partialViewState.fileName)
      }

      default: {
        return false
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Partial View</Typography>
      </Grid>
      <Grid item xs={12}>
        {partialViewState.uploadLoading ? (
          <LinearProgress variant="query" />
        ) : (
          <VerticalStepper
            stepContent={stepContent}
            getDisable={getDisable}
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            steps={steps}
            handleReset={handleReset}
          />
        )}
      </Grid>
    </Grid>
  )
}
