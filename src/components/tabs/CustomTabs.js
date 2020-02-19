import React, { useState, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { useHistory, Route, BrowserRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import SimpleTable from '../table/SimpleTable'
import {
  collaboratorStatusHead,
  queryListHead,
  queryListData
} from '../../constants/mockupData'
import CreateQuery from '../../containers/create-query/CreateQuery'
import { UploadPartialView } from './UploadPartialView'
import { TabPanel } from './TabPanel'
import { useStyles } from './useStyles'
import QueryList from '../query-list/QueryList'
import CollabTable from '../table/CollabTable'

export default function CustomTabs({
  tabLabels = [],
  projectDetail,
  sampleVectorState,
  loadSampleVector,
  partialViewState,
  handleFiles,
  submitPartialView,
  downloadOpt,
  handleChooseDownloadOpt,
  isPVReady,
  isVectorReady,
  project
}) {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const renderTabPanel = detail => {
    const { title, desc, collaborators } = detail

    const formatCollaborators = collaborators.map((item, idx) => {
      return {
        id: item
        // name: item
        // status: 'Ready'
      }
    })

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
                <Typography variant="body1">{title}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Project Description</Typography>
                <Typography variant="body1">{desc}</Typography>
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
                {/* <Typography variant="body1">No result</Typography> */}

                <CollabTable
                  headCells={collaboratorStatusHead}
                  data={formatCollaborators}
                />
              </Grid>
            </Grid>
          </TabPanel>
        )

      case 2:
        return !isPVReady ? (
          <TabPanel value={value} index={2}>
            {sampleVectorState && (
              <UploadPartialView
                loadSampleVector={loadSampleVector}
                sampleVectorState={sampleVectorState}
                classes={classes}
                handleFiles={handleFiles}
                partialViewState={partialViewState}
                submitPartialView={submitPartialView}
                downloadOpt={downloadOpt}
                handleChooseDownloadOpt={handleChooseDownloadOpt}
              />
            )}
          </TabPanel>
        ) : (
          <TabPanel value={value} index={2}>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ height: 400 }}
            >
              <Typography>Partial View Uploaded !!!</Typography>
            </Grid>
          </TabPanel>
        )

      case 3:
        return (
          <TabPanel value={value} index={3}>
            <CreateQuery project={project} />
          </TabPanel>
        )

      case 4:
        return (
          <TabPanel value={value} index={4}>
            <QueryList {...{ project }} />
          </TabPanel>
        )
    }
  }

  return projectDetail ? (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabLabels.map((item, index) => (
            <Tab
              disabled={
                (!isPVReady && [3, 4].includes(index)) ||
                (!isVectorReady && index === 2)
              }
              key={index}
              label={item}
              //   disabled={item === 'Queries'}
            />
          ))}
        </Tabs>
      </AppBar>
      <div className={classes.tabContainer}>
        {renderTabPanel(projectDetail)}
      </div>
    </div>
  ) : null
}
