import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder'
import ViewIcon from '@material-ui/icons/ViewCompact'
import MoreIcon from '@material-ui/icons/MoreVert'
import styled from 'styled-components'
import * as projectActions from '../actions/projectActions'
import ViewToggleButtonGroup from '../components/ViewToggleButtonGroup'
import TopBar from '../components/TopBar'
import MobileView from '../components/MobileView'

const StyledDrawer = styled(props => <Drawer {...props} classes={{ paper: 'paper' }} />)`
  & .paper {
    min-width: 100%;
    /*
    min-width: 200px;
    max-width: 350px;
    margin-right: 20%; */
    top: 50px; /* hack: AppBar height */
  }
`

const drawerWidth = 250

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
})

const StyledWrapper = styled.div`
  margin-left: ${drawerWidth}px;
`

const StyledListSubheader = styled(ListSubheader)`
  display: flex;
  justify-content: space-between;
  margin-right: -12px;
  padding: 4px;
`

const App = (props) => {
  const [selectedListItem, setSelectedListItem] = useState(0)
  const [openMenu, setOpenMenu] = useState({ anchorEl: null, open: false })

  const addView = () => {
    props.addView({
      type: 'view',
    })
  }

  const addFolder = () => {
    props.addView({
      type: 'folder',
    })
  }

  return (
    <StyledWrapper>
      <TopBar />
      <Drawer
        className={props.classes.drawer}
        classes={{
          paper: props.classes.drawerPaper,
        }}
        variant="permanent"
        anchor="left"
        open
      >
        <Menu
          onClose={() => setOpenMenu({ anchorEl: null, open: false })}
          anchorEl={openMenu.anchorEl}
          open={openMenu.open}
        >
          <MenuItem onClick={addFolder}>Add Folder</MenuItem>
          <MenuItem onClick={addView}>Add View</MenuItem>
        </Menu>
        <List
          component="nav"
          subheader={
            <StyledListSubheader component="div">
              Views
              <IconButton onClick={evt => setOpenMenu({ anchorEl: evt.currentTarget, open: true })}>
                <MoreIcon />
              </IconButton>
            </StyledListSubheader>
          }
        >
          {props.views.map(view => (
            <ListItem
              key={`l-${view.id}`}
              button
              selected={selectedListItem === view.id}
              onClick={() => setSelectedListItem(view.id)}
            >
              <ListItemIcon>{view.type === 'view' ? <ViewIcon /> : <FolderIcon />}</ListItemIcon>
              <ListItemText primary={view.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <ViewToggleButtonGroup />
      <MobileView />
    </StyledWrapper>
  )
}

function mapStateToProps (state) {
  return {
    views: state.project.views,
    projectName: state.project.name,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...projectActions }, dispatch)
}

App.propTypes = {
  views: PropTypes.array.isRequired,
  addView: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App))
