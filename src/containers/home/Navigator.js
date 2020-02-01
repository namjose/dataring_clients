import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import { Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const categories = [
  {
    id: 'Develop',
    children: [
      { id: 'Projects', icon: <PeopleIcon /> },
      { id: 'Requests', icon: <DnsRoundedIcon /> }
      // { id: 'Logs', icon: <PermMediaOutlinedIcon /> }
    ]
  }
]

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 14,
    paddingBottom: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  dataringLabel: {
    fontSize: 24,
    color: theme.palette.common.white
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    fontSize: 14,
    fontWeight: 500
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2)
  }
})

function Navigator(props) {
  const history = useHistory()
  const { pathname } = history.location

  const { classes, ...other } = props
  const [activeTab, setActiveTab] = React.useState(0)

  React.useEffect(() => {
    if (pathname) {
      if (pathname.includes('projects')) {
        setActiveTab(0)
      } else if (pathname.includes('requests')) {
        setActiveTab(1)
      }
    }
  }, [pathname])

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(
            classes.dataringLabel,
            classes.item,
            classes.itemCategory
          )}
        >
          Private Data Sharing
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, active }, index) => (
              <ListItem
                key={childId}
                button
                className={clsx(
                  classes.item,
                  index === activeTab && classes.itemActiveItem
                )}
                onClick={() => handleTabClick(index)}
                component="a"
                href={`/${childId.toLowerCase()}`}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  )
}

export default withStyles(styles)(Navigator)
