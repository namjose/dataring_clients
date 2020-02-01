import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CardActionArea } from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'

import PublicIcon from '@material-ui/icons/Public'
import LockIcon from '@material-ui/icons/Lock'

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
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  cardTitle: {
    paddingTop: 24
  }
})

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}

export default function CollaboratorCard({
  title,
  hanldeChooseColType,
  index
}) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => hanldeChooseColType(index)}>
        <CardContent className={classes.cardContent}>
          {index === 0 ? (
            <PublicIcon style={{ fontSize: 80 }} />
          ) : (
            <LockIcon style={{ fontSize: 80 }} />
          )}
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
