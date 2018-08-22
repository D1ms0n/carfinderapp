import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles/index';
import styles from './styles';
import classNames from "classnames";
import texts from "../../services/texts";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import * as LoginActions from "../../actions/LoginActions";

class Header extends Component {

  constructor(props) {
    super(props);
    this.texts = texts.texts;
    this.props = props;
    this.state = {
      anchorEl: null,
      openLogin: false,
      openRegistration: false
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {anchorEl} = this.state;
    const {classes,drawerOpen,handleDrawerToggle,login} = this.props;

    const notLoggedMenuItems =
      <div className={classes.noOutline}>
        <MenuItem className={classes.menuLinkWrap} onClick={this.handleClose}>
          <Link className={classes.menuLink} replace to="/login">{this.texts.login}</Link>
        </MenuItem>
        <MenuItem className={classes.menuLinkWrap} onClick={this.handleClose}>
          <Link className={classes.menuLink} replace to="/registration">{this.texts.registration}</Link>
        </MenuItem>
      </div>;

    const loggedMenuItems =
      <MenuItem className={classes.menuLinkWrap} onClick={this.handleClose}>
        <Link className={classes.menuLink} replace to="/logout">Logout</Link>
      </MenuItem>;

    const loggedAccountImg =
      <img className={classes.imgAvatar} src={login.data.img} alt={login.data.name} />;

    const userName =
      <Typography
        className={classes.useNameWrap}
        variant="caption"
        gutterBottom
          align="center">
          {login.data.name}
          <br />
          {login.data.email}
      </Typography>;

    const notLoggedAccountImg =
      <AccountCircle/>;

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

            { login.data
              ? userName
              : ''
            }
            <IconButton
              color='inherit'
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              { login.data
                ? loggedAccountImg
                : notLoggedAccountImg
              }
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              { login.data
                  ? loggedMenuItems
                  : notLoggedMenuItems
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Header));
