import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, TextField, Button } from '@material-ui/core'

export const UploadPartialView = ({ classes }) => {
  const [upload, setUpload] = useState('bank_partial_view.csv')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Partial View</Typography>
      </Grid>
      <Grid item xs={12} lg={10}>
        <TextField
          value={upload}
          //   onChange={handleChange('desc')}
          label="Upload Partial View Histogram"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={2}>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{ height: '100%' }}
          >
            Upload Partial View
          </Button>
        </label>
      </Grid>
      {upload && (
        <Grid item xs={12}>
          <Typography variant="h6">Brief Description</Typography>
          <Typography variant="p">Data Name: bank_partial_view</Typography>
          <br />
          <Typography variant="p">Total Rows: 1.000.000</Typography>
          <br />
          <Typography variant="p">Total Columns: 10</Typography>
        </Grid>
      )}
    </Grid>
  )
}
