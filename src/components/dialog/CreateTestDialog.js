import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3)
  }
}))

export default function CreateTestDialog({ open, handleClose }) {
  const classes = useStyles()
  const [state, setState] = React.useState({
    type1: true,
    type2: false,
    type3: false
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked })
  }

  const { type1, type2, type3 } = state
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Choose Test Functions</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Test Function Types</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type1}
                    onChange={handleChange('type1')}
                    value="type1"
                  />
                }
                label="Type 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type2}
                    onChange={handleChange('type2')}
                    value="type2"
                  />
                }
                label="Type 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type3}
                    onChange={handleChange('type3')}
                    value="type3"
                  />
                }
                label="Type 3"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
