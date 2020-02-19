import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { Grid, TextField, Button } from '@material-ui/core'
import { CSVLink, CSVDownload } from 'react-csv'

const defaultHeaders = [
  { label: 'First Name', key: 'firstname' },
  { label: 'Last Name', key: 'lastname' },
  { label: 'Email', key: 'email' }
]

const defaultData = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
]

export default function DownloadButton({
  headers = defaultHeaders,
  data = defaultData
}) {
  const csvLink = React.useRef()

  const handleDowload = () => {
    csvLink.current.link.click()
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleDowload}>
        Download Sample Vector
      </Button>
      <CSVLink
        data={data}
        headers={headers}
        filename="sample_vector.csv"
        target="_blank"
        ref={csvLink}
        hidden
      />
    </>
  )
}
