import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Grid, Button, LinearProgress } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { columnList } from '../../constants/mockupData'
import { FabAddIcon } from '../../components/fab-button/FabButton'
import { useDispatch, useSelector } from 'react-redux'
import apiMeta from '../../api/apiMeta'
import { QueryForm } from './QueryForm'
import apiQuery from '../../api/apiQuery'

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

export const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiExpansionPanelDetails)

const intialState = [
  {
    id: 1,
    selectedCollaborators: '',
    selectedColumns: [],
    columnValues: [],
    expanded: true
  }
]

export default function CreateQuery({ project }) {
  const classes = useStyles()
  const user = useSelector(state => state.auth.user)

  const [submitLoading, setSubmitLoading] = useState(false)

  const [collaboratorState, setCollaboratorState] = useState({
    collaboratorsOnProject: [],
    isLoading: false
  })

  useEffect(() => {
    const { collaborators, id } = project
    let userIdList = []
    userIdList = collaborators.filter(item => item !== user.id)
    if (project.creatorId !== user.id) {
      userIdList.push(project.creatorId)
    }
    setCollaboratorState({
      ...collaboratorState,
      isLoading: true
    })

    apiMeta
      .getMultiMetaByIdPair(userIdList.toString(), id)
      .then(res => {
        const { data } = res
        const formatData = data.map(item => {
          const { userId, columnLabels } = item
          return { userId, columnLabels }
        })

        setCollaboratorState({
          ...collaboratorState,
          isLoading: false,
          collaboratorsOnProject: formatData
        })
      })
      .catch(e => console.log(e))
  }, [])

  const [queryList, setQueryList] = React.useState(intialState)

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
        selectedCollaborators: '',
        selectedColumns: [],
        columnValues: [],
        expanded: true
      }
    ])
  }

  const removeQuery = idx => event => {
    setQueryList(queryList.filter((item, index) => index !== idx))
  }

  const handleOnSubmit = async () => {
    setSubmitLoading(true)
    try {
      const submitColumns = []
      const { collaboratorsOnProject } = collaboratorState
      for (const query of queryList) {
        const { selectedCollaborators, columnValues } = query
        const columnList = columnValues.map(item => {
          const { name, value } = item
          const defaultColumns = collaboratorsOnProject.find(
            item => item.userId === selectedCollaborators
          ).columnLabels
          const index = defaultColumns.indexOf(name)
          return {
            index,
            name,
            value
          }
        })

        submitColumns.push({
          projectId: project.id,
          creatorId: user.id,
          receiverId: selectedCollaborators,
          columnValues: columnList
        })
      }

      const promises = submitColumns.map(query => {
        return apiQuery.addQuery(query)
      })

      const responseQueries = await Promise.all(promises)

      console.log({ responseQueries })
      console.log('Submit form successfully !!')
      setQueryList(intialState)
      setSubmitLoading(false)
    } catch (e) {
      setSubmitLoading(false)
    }
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

  const { collaboratorsOnProject } = collaboratorState

  return (
    <Grid container>
      {/* {submitLoading && (
        <Grid item xs={12} style={{ padding: '24px 0px' }}>
          <LinearProgress variant="query" />
        </Grid>
      )} */}
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
                <QueryForm
                  selectedCollaborators={selectedCollaborators}
                  collaboratorsOnProject={collaboratorsOnProject}
                  classes={classes}
                  idx={idx}
                  columnValues={columnValues}
                  selectedColumns={selectedColumns}
                  handleSelectColumns={handleSelectColumns}
                  handleSelect={handleSelect}
                  removeQuery={removeQuery}
                  handleOnChange={handleOnChange}
                />
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
