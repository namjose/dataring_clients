import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ProjectInfo } from './ProjectInfo'
import MetadataTable from '../../components/table/MetadataTable'
import AdminQueryList from '../../components/query-list/AdminQueryList'

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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ProjectTabs({ project }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(2)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Project Information" />
          <Tab label="Metadata List" />
          <Tab label="Queries" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProjectInfo {...project} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MetadataTable project={project} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminQueryList {...{ project }} />
      </TabPanel>
    </div>
  )
}
