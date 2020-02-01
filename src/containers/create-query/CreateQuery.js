import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Grid, IconButton, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { collaboratorsOnProject, columnList } from '../../constants/mockupData'
import CustomTextfield from '../../components/custom-textfield/CustomTextfield'
import { FabAddIcon } from '../../components/fab-button/FabButton'
import MultipleSelect from '../../components/multi-select/MultipleSelect'

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

export default function CreateQuery() {
  const classes = useStyles()

  const [queryList, setQueryList] = React.useState([
    {
      id: 1,
      selectedCollaborators: [],
      selectedColumns: [],
      columnValues: [],
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

  const handleSelectColumns = (idx, name) => event => {
    const newQueryList = queryList.map((item, index) => {
      if (index === idx) {
        return {
          ...item,
          [name]: event.target.value,
          columnValues: event.target.value.map(item => {
            return {
              name: item,
              value: ''
            }
          })
        }
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
        columnValues: [],
        expanded: true
      }
    ])
  }

  const removeQuery = idx => event => {
    setQueryList(queryList.filter((item, index) => index !== idx))
  }

  const handleOnSubmit = () => {
    console.log({ queryList })

    setQueryList([
      {
        id: 1,
        selectedCollaborators: [],
        selectedColumns: [],
        columnValues: [],
        expanded: true
      }
    ])
  }

  const handleOnChange = (queryIdx, columnIdx) => event => {
    const newQueryList = queryList.map((item, index) => {
      if (index === queryIdx) {
        const newColumnValues = item.columnValues.map((col, idx) => {
          return columnIdx === idx
            ? {
                ...col,
                value: event.target.value
              }
            : col
        })

        return { ...item, columnValues: newColumnValues }
      }
      return item
    })
    setQueryList(newQueryList)
  }

  const submitCondition =
    queryList.filter(query => {
      const { selectedCollaborators, selectedColumns, columnValues } = query
      return (
        selectedCollaborators.length &&
        selectedColumns.length &&
        columnValues.filter(col => !col.value).length === 0
      )
    }).length === queryList.length

  return (
    <Grid container>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Create Query</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOnSubmit}
          disabled={!submitCondition}
        >
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
              expanded,
              columnValues
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
                        <Typography className={classes.title} variant="p">
                          Query On: &nbsp;
                        </Typography>
                      </div>
                      <MultipleSelect
                        required
                        label="Create Query"
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
                        <Typography className={classes.title} variant="p">
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
                        handleSelect={handleSelectColumns}
                      />
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      style={{ paddingTop: 18 }}
                      direction="column"
                    >
                      <Typography className={classes.title} variant="p">
                        Column Values: &nbsp;
                      </Typography>
                      {columnValues.map((item, columnIdx) => (
                        <CustomTextfield
                          key={columnIdx}
                          label={item.name}
                          value={item.value}
                          onChange={handleOnChange(idx, columnIdx)}
                        />
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
