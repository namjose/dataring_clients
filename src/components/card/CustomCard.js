import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

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

export default function CustomCard({ item }) {
  const history = useHistory()
  const classes = useStyles()
  const { id, title, content, status } = item

  const hanldeOnClick = () => {
    history.push(`/projects/projectDetail/${id}`)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea disabled={status.includes('Not')} onClick={hanldeOnClick}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            15/01/2020
          </Typography>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          {/* <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography> */}
          <Typography variant="body2" component="p">
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disabled size="small">
            &nbsp;Status: {status}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
