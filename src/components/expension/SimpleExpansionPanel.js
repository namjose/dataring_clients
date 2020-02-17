import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Grid, IconButton, Button } from '@material-ui/core'
import MultipleSelect from '../multi-select/MultipleSelect'
import CustomTextfield from '../custom-textfield/CustomTextfield'
import { FabAddIcon } from '../fab-button/FabButton'
import { withStyles } from '@material-ui/core/styles'
import { collaboratorsOnProject, columnList } from '../../constants/mockupData'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  title: {
    fontWeight: '600'
  }
}))

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiExpansionPanel)

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails)

export default function SimpleExpansionPanel() {
  const classes = useStyles()

  const [queryList, setQueryList] = React.useState([
    {
      id: 1,
      selectedCollaborators: [],
      selectedColumns: [],
      expanded: true
    }
  ])

  const handleSelect = (idx, name) => event => {
    const newQueryList = queryList.map((item, index) => {
      if (index === idx) {
        return { ...item, [name]: event.target.value }
      }
      return item
    })
    setQueryList(newQueryList)
  }

  const handleChangeExpansion = idx => event => {
    const newQueryList = queryList.map((item, index) => {
      if (index === idx) {
        return { ...item, expanded: !item.expanded }
      }
      return item
    })
    setQueryList(newQueryList)
  }

  const addQuery = () => {
    setQueryList([
      ...queryList,
      {
        id: queryList.length + 1,
        selectedCollaborators: [],
        selectedColumns: [],
        expanded: true
      }
    ])
  }

  const removeQuery = idx => event => {
    setQueryList(queryList.filter((item, index) => index !== idx))
  }

  return (
    <Grid container>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Create Query</Typography>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
      <Grid item xs={12} style={{ margin: '24px 0px' }}>
        <div className={classes.root}>
          {queryList.map((item, idx) => {
            const {
              id,
              selectedCollaborators,
              selectedColumns,
              expanded
            } = item
            return (
              <ExpansionPanel
                key={idx}
                expanded={expanded}
                square
                onChange={handleChangeExpansion(idx)}
              >
                <ExpansionPanelSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    Query #{id}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container>
                    <Grid
                      item
                      container
                      xs={12}
                      direction="row"
                      alignItems="baseline"
                    >
                      <div>
                        {idx > 0 && (
                          <div
                            style={{ position: 'absolute', top: 6, right: 12 }}
                          >
                            <IconButton
                              component="span"
                              onClick={removeQuery(idx)}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </div>
                        )}
                        <Typography className={classes.title} variant="body1">
                          Query On: &nbsp;
                        </Typography>
                      </div>
                      <MultipleSelect
                        required
                        label="Collaborators"
                        data={collaboratorsOnProject}
                        selected={selectedCollaborators}
                        index={idx}
                        name="selectedCollaborators"
                        handleSelect={handleSelect}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      direction="row"
                      alignItems="baseline"
                    >
                      <div>
                        <Typography className={classes.title} variant="body1">
                          Column List: &nbsp;
                        </Typography>
                      </div>
                      <MultipleSelect
                        required
                        label="Columns"
                        data={columnList}
                        selected={selectedColumns}
                        index={idx}
                        name="selectedColumns"
                        handleSelect={handleSelect}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      style={{ paddingTop: 18 }}
                      direction="column"
                    >
                      <Typography className={classes.title} variant="body1">
                        Column Values: &nbsp;
                      </Typography>
                      {selectedColumns.map((item, index) => (
                        <CustomTextfield key={index} label={item} />
                      ))}
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })}
        </div>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}
        >
          <FabAddIcon
            onClick={() => {
              addQuery()
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}
