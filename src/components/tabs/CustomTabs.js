import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, Route, BrowserRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import SimpleTable from '../table/SimpleTable'
import {
  collaboratorStatusData,
  collaboratorStatusHead,
  queryListHead,
  queryListData
} from '../../constants/mockupData'
import CreateQuery from '../../containers/create-query/CreateQuery'
import SimpleExpansionPanel from '../expension/SimpleExpansionPanel'
import UploadButton from '../upload-button/UploadButton'
import { UploadPartialView } from './UploadPartialView'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabContainer: {
    border: '1px solid #bdbdbd'
  },
  input: {
    display: 'none'
  }
}))

export default function CustomTabs({ tabLabels = [] }) {
  const classes = useStyles()
  const history = useHistory()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const onRowClick = queryId => event => {
    history.push(`/queries/${queryId}`)
  }

  const renderTabPanel = () => {
    switch (value) {
      case 0:
        return (
          <TabPanel value={value} index={0}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5">Project Information</Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '24px 0px' }}>
                <Typography variant="h6">Project Title</Typography>
                <Typography variant="p">
                  Part A, Part B and Part C - Public Data Exchange
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Project Description</Typography>
                <Typography variant="p">Public Data Exchange</Typography>
              </Grid>
            </Grid>
          </TabPanel>
        )

      case 1:
        return (
          <TabPanel value={value} index={1}>
            <Grid container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="space-between"
              >
                <Typography variant="h5">Collaborators</Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '24px 0px' }}>
                {/* <Typography variant="p">No result</Typography> */}

                <SimpleTable
                  headCells={collaboratorStatusHead}
                  data={collaboratorStatusData}
                />
              </Grid>
            </Grid>
          </TabPanel>
        )

      case 2:
        return (
          <TabPanel value={value} index={2}>
            <UploadPartialView classes={classes} />
          </TabPanel>
        )

      case 3:
        return (
          <TabPanel value={value} index={3}>
            <CreateQuery />
          </TabPanel>
        )

      case 4:
        return (
          <TabPanel value={value} index={4}>
            <Grid container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justify="space-between"
              >
                <Typography variant="h5">Query List</Typography>
              </Grid>
              <Grid item xs={12} style={{ margin: '24px 0px' }}>
                {/* <Typography variant="p">No result</Typography> */}

                <SimpleTable
                  headCells={queryListHead}
                  data={queryListData}
                  onRowClick={onRowClick}
                />
              </Grid>
            </Grid>
          </TabPanel>
        )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabLabels.map((item, index) => (
            <Tab
              key={index}
              label={item}
              {...a11yProps(index)}
              //   disabled={item === 'Queries'}
            />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.tabContainer}>{renderTabPanel()}</div>
    </div>
  )
}
