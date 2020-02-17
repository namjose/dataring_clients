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
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500
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

function ProfileCard({ user }) {
  const classes = useStyles()

  if (user) {
    const { username, email, totalProjects, totalQuery, joinDate } = user
    return (
      <>
        <Grid item xs={12} container justify="center">
          <Card className={classes.card}>
            <CardHeader
              title="Profile"
              className={classes.cardHeader}
              content
            />
            <CardContent>
              <Typography paragraph>
                <b>Email: </b> {email}
              </Typography>
              <Typography paragraph>
                <b>Username: </b> {username}
              </Typography>
              {/* <Typography paragraph>
                <b>Join Date:</b> {moment(joinDate).format('DD-MM-YYYY')}
              </Typography>
              <Typography paragraph>
                <b>Total Project: </b> {totalProjects}
              </Typography>
              <Typography paragraph>
                <b>Total Query:</b> {totalQuery}
              </Typography> */}
            </CardContent>
          </Card>
        </Grid>
      </>
    )
  }
  return null
}

const mapStateToProps = getState => ({
  user: getState.auth.user
})

export default connect(mapStateToProps)(ProfileCard)
