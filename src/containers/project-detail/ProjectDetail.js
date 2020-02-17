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

function ProjectDetail(props) {
  const { classes } = props
  const dispatch = useDispatch()

  const [project, setProject] = React.useState(null)
  const user = useSelector(state => state.auth.user)
  const metaData = useSelector(state => state.metaReducer)

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

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchMetaAction(user.id, projectId))
    }
  }, [])

  const [downloadOpt, setDownloadOpt] = useState(false)
  const [totalSize, setTotalSize] = useState(0)
  const [sampleVector, setSampleVector] = useState([])
  const [loadingSV, setLoadingSV] = useState(true)
  const [loadCount, setLoadCount] = useState(0)

  useEffect(() => {
    setTotalSize(metaData.totalRow)
  }, [metaData])

  const handleChooseDownloadOpt = value => {
    setDownloadOpt(value)
  }

  const loadSampleVector = async () => {
    const requestURLs = []
    const sizeOffset = totalSize / LIMIT
    for (let offset = 0; offset < sizeOffset; offset++) {
      requestURLs.push(
        `/sampleVector/${metaData.id}?limit=${LIMIT}&offset=${offset * LIMIT}`
      )
    }
    const vector = []

    for (const [idx, url] of requestURLs.entries()) {
      try {
        const batchData = await baseAxios.get(url)
        console.log(`Received Batch ${idx + 1}:`, batchData)
        const subset = batchData.data
        vector.push(...subset)
        setLoadCount(prevCount => prevCount + 1)
      } catch (e) {
        console.log('Error in Batch ' + (idx + 1))
        break
      }
    }

    console.log('Finished!' + 'vector size: ' + vector.length)
    setSampleVector(vector)
    setLoadingSV(false)
  }

  const [partialViewState, setPartialViewState] = useState({
    fileName: '',
    totalRow: 0,
    isLoading: false,
    file: null,
    uploadLoading: false
  })

  const handleFiles = files => {
    setPartialViewState(prevState => ({
      ...prevState,
      isLoading: true
    }))

    const csvFile = files[0]
    console.log(csvFile)

    Papa.parse(csvFile, {
      complete: result => {
        var data = result.data
        const {
          meta: { fields },
          meta
        } = result
        console.log({ data, meta })
        setPartialViewState(prevState => ({
          ...prevState,
          isLoading: false,
          fileName: csvFile.name,
          totalRow: data.length - 1, // minus header
          file: csvFile //
        }))
      },
      header: true
    })
  }

  const submitPartialView = () =>
    new Promise((resolve, reject) => {
      const { file } = partialViewState
      const formData = new FormData()
      formData.set('uploaded_file', file)

      console.log({ file, id: metaData.id })
      setPartialViewState({ ...partialViewState, uploadLoading: true })

      baseAxios
        .post(`/partialView/upload?metaDataId=${metaData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log({ res })
          setPartialViewState({ ...partialViewState, uploadLoading: false })

          resolve()
        })
        .catch(e => {
          console.log(e)
          reject({ error: e })
        })
    })

  return project && metaData && totalSize ? (
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
        <CustomTabs
          tabLabels={USER_PROJECT_TAB}
          projectDetail={project}
          sampleVectorState={{
            sampleVector,
            loadingSV,
            loadCount,
            totalSize
          }}
          loadSampleVector={loadSampleVector}
          partialViewState={partialViewState}
          handleFiles={handleFiles}
          submitPartialView={submitPartialView}
          downloadOpt={downloadOpt}
          handleChooseDownloadOpt={handleChooseDownloadOpt}
          isPVReady={metaData.isPVReady}
          isVectorReady={metaData.isVectorReady}
          // create query
          project={project}
        />
      </div>
    </Paper>
  ) : null
}

export default withStyles(styles)(ProjectDetail)
