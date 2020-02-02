import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, TextField, Button } from '@material-ui/core'
import { CSVLink, CSVDownload } from 'react-csv'
import ReactFileReader from 'react-file-reader'
import Papa from 'papaparse'

const headers = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' }
]

const data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
]

export const UploadPartialView = ({ classes }) => {
  const [upload, setUpload] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [fileUpload, setFileUpload] = useState({
    fileName: '',
    totalRow: 0,
    totalColumns: 0
  })

  const csvLink = React.useRef()

  const handleDowload = () => {
    csvLink.current.link.click()
  }

  const handleFiles = files => {
    setIsLoading(true)

    const csvFile = files[0]
    console.log(csvFile)

    Papa.parse(csvFile, {
      complete: result => {
        var data = result.data
        const {
          meta: { fields },
          meta
        } = result
        console.log({ data, meta })
        setIsLoading(false)
        setFileUpload({
          fileName: csvFile.name,
          totalColumns: fields.length,
          totalRow: data.length
        })
      },
      header: true
    })

    let formData = new FormData()
    formData.append('csvFile', csvFile)
    formData.append('name', csvFile.name)

    // post to upload file
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container direction="row" justify="space-between">
        <Typography variant="h5">Partial View</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleDowload}>
          Download Sample Vector
        </Button>
        <CSVLink
          data={data}
          headers={headers}
          filename="sample-vector.csv"
          target="_blank"
          ref={csvLink}
          hidden
        />
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
        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            style={{ height: '100%' }}
          >
            Upload Partial View
          </Button>
        </ReactFileReader>
      </Grid>
      {isLoading && (
        <Grid item xs={12}>
          <Typography>Loading...</Typography>
        </Grid>
      )}
      {fileUpload.fileName && (
        <Grid item xs={12}>
          <Typography variant="h6">Brief Description</Typography>
          <Typography variant="p">Data Name: {fileUpload.fileName}</Typography>
          <br />
          <Typography variant="p">Total Rows: {fileUpload.totalRow}</Typography>
          <br />
          <Typography variant="p">
            Total Columns: {fileUpload.totalColumns}
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
