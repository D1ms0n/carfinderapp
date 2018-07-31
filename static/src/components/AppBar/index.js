
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import texts from "../../services/texts";
import classNames from "classnames";
import {Link} from "react-router-dom";

import AuthActions from './../../components/Header';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 250;

const styles = (theme) => ({
  link: {
    color: theme.headerLinksColor[50],
    textDecoration: 'none',
    paddingLeft: 10
  },
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    backgroundColor: theme.palette.primary[500],
    borderRadius: theme.radius,
    boxShadow: theme.shadows[2],
    margin: '0 20px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.texts = texts.texts;
  }
  render(){
    const {classes,drawerOpen,handleDrawerToggle} = this.props;
    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
          [classes['appBarShift-left']]: drawerOpen,
        })}
      >
        <Toolbar className={classes.toolBar} disableGutters={!drawerOpen}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={handleDrawerToggle}
            className={classNames(classes.menuButton, drawerOpen && classes.hide)}
          >
            <Badge color='error' badgeContent={4}>
              <MenuIcon/>
            </Badge>
          </IconButton>
          <Typography
            variant='title'
            color='inherit'
            noWrap>
            <Link className={classes.link} to="/">{ this.texts.headerTitle}</Link>
          </Typography>
          <AuthActions />
        </Toolbar>
      </AppBar>
    );
  }
}


export default withStyles(styles)(Login);
