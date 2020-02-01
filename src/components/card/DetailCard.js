import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import palletes from '../../constants/palletes'
import { Divider, Button, Grid } from '@material-ui/core'
import { queryDetail } from '../../constants/mockupData'
import moment from 'moment'
import { capitlizeString } from '../../utils/formatString'

const useStyles = makeStyles(theme => ({
  card: {
    width: '100%'
  },
  cardHeader: {
    borderBottom: `1px solid ${palletes.GREY}`
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  buttonStyle: {
    color: palletes.BLUE,
    border: `1px solid ${palletes.BLUE}`,
    cursor: 'default',
    marginRight: 8,
    marginLeft: 8
  }
}))

export default function DetailCard({ detail = queryDetail, queryId }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const {
    id,
    publishDate,
    collaborators,
    columnValues,
    status,
    result
  } = detail

  console.log({ detail })

  return (
    <>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardHeader
            title="Description"
            subheader={`Status: ${status}`}
            className={classes.cardHeader}
            content
          />
          <CardContent>
            <Typography paragraph>
              <b>Query ID:</b> #{`${queryId}`}
            </Typography>
            <Typography paragraph>
              <b>Publish Date:</b> {moment(publishDate).format('DD-MM-YYYY')}
            </Typography>
            <Grid container alignItems="baseline">
              <Typography paragraph>
                <b>Query Creator:</b>
              </Typography>
              <Button
                className={classes.buttonStyle}
                variant="outlined"
                disableFocusRipple
                disableRipple
              >
                Party A
              </Button>
            </Grid>
            <Grid container alignItems="baseline" style={{ marginTop: 18 }}>
              <Typography paragraph>
                <b>Query On:</b>
              </Typography>
              {collaborators.map((item, idx) => (
                <Button
                  key={idx}
                  className={classes.buttonStyle}
                  variant="outlined"
                  disableFocusRipple
                  disableRipple
                >
                  {item.name}
                </Button>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 24 }}>
        <Card className={classes.card}>
          <CardHeader
            title="Column Values"
            subheader={`Total columns: ${columnValues.length}`}
            className={classes.cardHeader}
            content
          />
          <CardContent>
            {columnValues.map((item, index) => {
              return (
                <Typography key={index} paragraph>
                  <b>{capitlizeString(item.name)}</b>: {item.value}
                </Typography>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
      {status === 'Done' && (
        <Grid item xs={12} style={{ marginTop: 24 }}>
          <Card className={classes.card}>
            <CardHeader title="Result" className={classes.cardHeader} content />
            <CardContent>
              <Typography paragraph>
                <b>Total matching rows:</b> {result}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  )
}
