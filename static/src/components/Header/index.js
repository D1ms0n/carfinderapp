import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import styles from './styles';
import classNames from "classnames";
import texts from "../../services/texts";
import {Link} from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends Component {
  constructor(props) {
    super(props);
    this.texts = texts.texts;
    this.state = {
      anchorEl: null,
      openLogin: false,
      openRegistration: false
    };
  }

  render() {
    const {anchorEl} = this.state;
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
            <Link className={classes.link} replace to="/">{this.texts.headerTitle}</Link>
          </Typography>
          <div className={classes.root}>
            <IconButton
              color='inherit'
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
            >
              <AccountCircle/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);