import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabContainer: {
    border: '1px solid #bdbdbd'
  },
  input: {
    display: 'none'
  }
}))
