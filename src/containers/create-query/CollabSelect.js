import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 12
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function CollabSelect({
  value,
  handleSelect,
  index,
  data = []
}) {
  const classes = useStyles()

  //   const inputLabel = React.useRef(null)
  //   const [labelWidth, setLabelWidth] = React.useState(0)
  //   React.useEffect(() => {
  //     setLabelWidth(inputLabel.current.offsetWidth)
  //   }, [])

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-helper-label">Collaborator</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        onChange={handleSelect && handleSelect(index, 'selectedCollaborators')}
      >
        {data.map((item, idx) => (
          <MenuItem key={idx} value={item}>
            {item}
          </MenuItem>
        ))}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  )
}
