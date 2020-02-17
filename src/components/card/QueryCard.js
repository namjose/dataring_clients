import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

export default function QueryCard({ item, index }) {
  const history = useHistory()
  const classes = useStyles()
  const { creatorId, receiverId } = item

  const hanldeOnClick = () => {
    const { id } = item
    history.push(`/queries/list/${id}`)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea
        style={{ minHeight: 175 }}
        // disabled={!status}
        onClick={hanldeOnClick}
      >
        <CardContent>
          <Typography variant="h6" component="h2">
            Query and Test Function Group {index + 1}
          </Typography>
          <Typography variant="body1" component="h2">
            {/* {creatorId} - {receiverId} */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
