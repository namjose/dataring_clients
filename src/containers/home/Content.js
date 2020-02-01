import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import RefreshIcon from '@material-ui/icons/Refresh'
import './Query.scss'

const buttonList = [
  ['Execute Query', 'Clear Query'],
  ['Insert Column', 'Insert SQL Functions', 'Executed Result']
]

const styles = theme => ({
  paper: {
    // maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: 'block'
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: '40px 16px'
  }
})

function Content(props) {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <TextareaAutosize
            className="textArea"
            aria-label="minimum height"
            rows={5}
            // placeholder="Minimum 3 rows"
          />
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item container xs>
          {buttonList.map((row, idx) => {
            return idx === 0 ? (
              <Grid key={idx} item xs>
                {row.map(button => (
                  <Button
                    key={button}
                    className="customButton"
                    variant="contained"
                  >
                    {button}
                  </Button>
                ))}
              </Grid>
            ) : (
              <Grid key={idx} item>
                {row.map(button => (
                  <Button
                    key={button}
                    className="customButton"
                    variant="contained"
                  >
                    {button}
                  </Button>
                ))}
              </Grid>
            )
          })}
        </Grid>
        <Grid item container xs>
          <Grid item xs={12}>
            {/* <Typography>
              Click on the table/column listed below, to insert it in the SQL
              query
            </Typography> */}
          </Grid>
          <Grid item xs style={{ padding: 8 }}>
            <div>
              <Typography>Table</Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className={classes.contentWrapper}></div> */}
    </Paper>
  )
}

export default withStyles(styles)(Content)
