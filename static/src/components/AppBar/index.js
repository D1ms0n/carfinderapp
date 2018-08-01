
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from "classnames";
import texts from "../../services/texts";
import {Link} from "react-router-dom";
import styles from './styles';
import AuthActions from './../../components/Header';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';

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
