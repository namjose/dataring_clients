import React from 'react'
import Typography from '@material-ui/core/Typography'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { Grid, IconButton } from '@material-ui/core'
import CustomTextfield from '../../components/custom-textfield/CustomTextfield'
import MultipleSelect from '../../components/multi-select/MultipleSelect'
import CollabSelect from './CollabSelect'
import { ExpansionPanelDetails } from './CreateQuery'

export const QueryForm = ({
  collaboratorsOnProject = [],
  idx,
  classes,
  handleSelect,
  handleSelectColumns,
  selectedCollaborators,
  selectedColumns,
  handleOnChange,
  columnValues,
  removeQuery
}) => {
  const collaboratorLabels = collaboratorsOnProject.map(item => item.userId)
  const columnLabels = selectedCollaborators
    ? collaboratorsOnProject.find(item => item.userId === selectedCollaborators)
        .columnLabels
    : []
  return (
    <ExpansionPanelDetails>
      <Grid container>
        <Grid item container xs={12} direction="row" alignItems="baseline">
          <div>
            {idx > 0 && (
              <div style={{ position: 'absolute', top: 6, right: 12 }}>
                <IconButton component="span" onClick={removeQuery(idx)}>
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            )}
            <Typography className={classes.title} variant="body1">
              Query On: &nbsp;
            </Typography>
          </div>
          <CollabSelect
            index={idx}
            data={collaboratorLabels}
            handleSelect={handleSelect}
            value={selectedCollaborators}
          />
        </Grid>
        <Grid item container xs={12} direction="row" alignItems="baseline">
          <div>
            <Typography className={classes.title} variant="body1">
              Column List: &nbsp;
            </Typography>
          </div>
          <MultipleSelect
            required
            data={columnLabels}
            label="Columns"
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
          <Typography className={classes.title} variant="body1">
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
  )
}
