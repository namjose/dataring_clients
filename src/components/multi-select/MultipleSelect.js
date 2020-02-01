import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '30%',
    maxWidth: '80%'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const defaultData = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

function getStyles(name, selected, theme) {
  return {
    fontWeight:
      selected.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export default function MultipleSelect({
  label,
  data = defaultData,
  selected = [],
  required,
  handleSelect,
  index,
  name
}) {
  const classes = useStyles()
  const theme = useTheme()

  // const handleChange = event => {
  //   setSelected(event.target.value)
  // }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">{label}</InputLabel>
      <Select
        required={required}
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={selected}
        onChange={handleSelect(index, name)}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {data.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, selected, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
