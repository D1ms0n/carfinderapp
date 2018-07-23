import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';

import Login from './../Login';
import Registration from './../Registration';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  typography: {
    flex: 1,
    textAlign: 'left',
    margin: theme.spacing.unit * 2,
  },
  modal: {
    position: 'absolute',
    top: '20%',
    left: '35%',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
  paper: {
    padding: 15,
    marginTop: 10,
    borderRadius: 0,
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    textAlign: 'center'
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      openLogin: false,
      openRegistration: false
    };
  }
  changeState = (stateToChange) => {
    this.setState({
      [stateToChange]: !this.state[stateToChange]
    });
  };
  render() {
    const {classes} = this.props;
    const {auth} = this.state;
    return (
      <Grid className={classes.grid} item lg={8} md={10} sm={11} xs={11}>
        <Paper className={classes.paper}>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  onClick={this.props.handleDrawerToggle.bind(this)}
                  className={classes.menuButton}
                  color='inherit'
                >
                  <Badge color='secondary' badgeContent={4}>
                    <MenuIcon/>
                  </Badge>
                </IconButton>
                <Typography
                  variant='title'
                  color='inherit'
                  className={classes.typography}
                >
                  Headline
                </Typography>
                <Button onClick={()=>{this.changeState('openLogin')}} color='inherit'>Login</Button>
                <Button onClick={()=>{this.changeState('openRegistration')}} color='inherit'>Registration</Button>
                {auth && (
                  <IconButton
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
            <Dialog
              open={this.state.openLogin}
              onClose={()=>{this.changeState('openLogin')}}
              aria-labelledby="form-dialog-title"
            >
              <Login
                changeState={this.changeState}
              />
            </Dialog>
            <Dialog
              open={this.state.openRegistration}
              onClose={()=>{this.changeState('openRegistration')}}
              aria-labelledby="form-dialog-title"
            >
              <Registration
                changeState={this.changeState}
              />
            </Dialog>
          </div>
        </Paper>
      </Grid>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Header));
