import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ReactFileReader from 'react-file-reader'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import palletes from '../../constants/palletes'
import {
  Divider,
  Button,
  Grid,
  LinearProgress,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { queryDetail } from '../../constants/mockupData'
import moment from 'moment'
import { capitlizeString, getStatus } from '../../utils/formatString'
import QueryStepper from '../../containers/query-detail/QueryStepper'
import { LIMIT_DOWNLOAD, DOMAIN_CIPHERTEXT_HEADER } from '../../constants'
import baseAxios from '../../api/baseAxios'
import apiQuery from '../../api/apiQuery'
import { CSVLink } from 'react-csv'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  cardHeader: {
    borderBottom: `1px solid ${palletes.GREY}`
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  buttonStyle: {
    color: palletes.BLUE,
    border: `1px solid ${palletes.BLUE}`,
    cursor: 'default',
    marginRight: 8,
    marginLeft: 8
  }
}))

const intialState = {
  vector: [],
  loadCount: 0,
  loadingDownload: false
}

export default function ReceiveQueryCard({ detail = queryDetail }) {
  const history = useHistory()
  const classes = useStyles()
  const {
    id,
    queryId,
    creatorName,
    receiverName,
    columnValues,
    isQueryVectorReady,
    truthEncodeAnswer,
    encodeCipherAnswer,
    vectorSize,
    verified
  } = detail

  console.log({ detail })

  const apiType = verified ? 'testFunction' : 'query'
  const totalSize = vectorSize

  const [queryState, setQueryState] = useState(intialState)
  const csvLink = useRef()

  const loadQueryVector = async () => {
    const requestURLs = []
    const sizeOffset = Math.floor(totalSize / LIMIT_DOWNLOAD)
    for (let offset = 0; offset < sizeOffset; offset++) {
      requestURLs.push(
        `${apiType}/vector/${id}?limit=${LIMIT_DOWNLOAD}&offset=${offset *
          LIMIT_DOWNLOAD}`
      )
    }
    const vector = []

    setQueryState({ ...queryState, loadingDownload: true })

    for (const [idx, url] of requestURLs.entries()) {
      try {
        const batchData = await baseAxios.get(url)
        console.log(`Received Batch ${idx + 1}:`, batchData)
        const subset = batchData.data
        vector.push(...subset)
        setQueryState(prevState => ({
          ...prevState,
          loadCount: prevState.loadCount + 1
        }))
      } catch (e) {
        console.log('Error in Batch ' + (idx + 1))
        setQueryState(intialState)
        break
      }
    }

    console.log('Finished!' + 'vector size: ' + vector.length)
    setQueryState(prevState => ({
      ...prevState,
      vector,
      loadingDownload: false
    }))

    csvLink.current.link.click()
  }

  const handleDowload = () => {
    loadQueryVector()
  }

  const [answer, setAnswer] = useState({
    fileName: '',
    encodeCipherAnswer: ''
  })

  const handleFiles = files => {
    const jsonFile = files[0]
    var readFile = new FileReader()
    readFile.onload = e => {
      const { name } = jsonFile
      var contents = e.target.result
      var json = JSON.parse(contents)
      const { encodeCipherAnswer } = json
      console.log({ json })

      setAnswer(prevState => ({
        ...prevState,
        encodeCipherAnswer,
        fileName: name
      }))
    }

    readFile.readAsText(jsonFile)
  }

  const handleSubmit = () =>
    new Promise((resolve, reject) => {
      const { encodeCipherAnswer } = answer
      const data = {
        encodeCipherAnswer
      }
      baseAxios
        .put(`${apiType}/${id}`, {
          ...data
        })
        .then(res => {
          console.log({ res })
          history.push('/temp')
          history.goBack()
        })
        .catch(e => console.log({ e }))
    })

  const getStepContent = index => {
    const { vector, loadCount, loadingDownload } = queryState
    const percentValue =
      (loadCount / Math.floor(totalSize / LIMIT_DOWNLOAD)) * 100
    switch (index) {
      case 0: {
        return (
          <>
            {loadingDownload && (
              <LinearProgress
                variant="determinate"
                value={percentValue}
                style={{ margin: '24px 0px' }}
              />
            )}
            {isQueryVectorReady && (
              <>
                <Button
                  //   disabled={loadingSV}
                  variant="contained"
                  color="primary"
                  onClick={handleDowload}
                >
                  Download Query Vector
                </Button>
                <CSVLink
                  data={vector}
                  filename="query_vector.csv"
                  target="_blank"
                  ref={csvLink}
                  hidden
                  headers={DOMAIN_CIPHERTEXT_HEADER}
                />
              </>
            )}
          </>
        )
      }

      case 1: {
        return (
          <Grid container alignItems="center" justify="center" xs={12}>
            <Grid item xs={8} md={10}>
              <TextField
                value={answer.fileName}
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
                  Upload Answer
                </Button>
              </ReactFileReader>
            </Grid>
            {/* <Grid item xs={12} container>
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                  <ListItemText primary="Got answer" />
                </ListItem>
              </List>
            </Grid> */}
          </Grid>
        )
      }

      default:
        return null
    }
  }

  console.log({ detail })

  return (
    <>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title="Description"
            subheader={`Status: ${getStatus(
              isQueryVectorReady,
              truthEncodeAnswer,
              true
            )}`}
            className={classes.cardHeader}
            content
          />
          <CardContent>
            <Typography paragraph>
              <b>Query ID:</b> {`${id}`}
            </Typography>
            <Grid container alignItems="baseline">
              <Typography paragraph>
                <b>Query Creator:</b>
              </Typography>
              <Button
                className={classes.buttonStyle}
                variant="outlined"
                disableFocusRipple
                disableRipple
              >
                {creatorName}
              </Button>
            </Grid>
            <Grid container alignItems="baseline" style={{ marginTop: 18 }}>
              <Typography paragraph>
                <b>Query On:</b>
              </Typography>
              <Button
                className={classes.buttonStyle}
                variant="outlined"
                disableFocusRipple
                disableRipple
              >
                {receiverName}
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {columnValues && columnValues.length ? (
        <Grid item xs={12} style={{ marginTop: 24 }}>
          <Card className={classes.card}>
            <CardHeader
              title="Column Values"
              subheader={`Total columns: ${columnValues.length}`}
              className={classes.cardHeader}
              content
            />
            <CardContent>
              {columnValues.map((item, index) => {
                return (
                  <Typography key={index} paragraph>
                    <b>{capitlizeString(item.name)}</b>: {item.value}
                  </Typography>
                )
              })}
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <Grid item xs={12} style={{ marginTop: 24 }}>
          <Card className={classes.card}>
            <CardHeader
              title="Column Values"
              // subheader={`Total columns: ${columnValues.length}`}
              className={classes.cardHeader}
              content
            />
            <CardContent>
              <Typography paragraph>
                <b>All columns </b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
      {isQueryVectorReady && (
        <Grid item xs={12} style={{ marginTop: 24 }}>
          <Card className={classes.card}>
            <CardHeader
              title="Upload Encrypted Answer"
              // subheader={`Status: Query Vector N`}
              className={classes.cardHeader}
              content
            />
            <CardContent>
              {encodeCipherAnswer ? (
                <Typography>Answer Uploaded</Typography>
              ) : (
                <QueryStepper
                  handleSubmit={handleSubmit}
                  getStepContent={getStepContent}
                  disableSubmit={answer.encodeCipherAnswer}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  )
}
