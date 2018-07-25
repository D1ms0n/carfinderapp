
import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Login from './../Login';
import Registration from './../Registration';

class AuthActions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openLogin: false,
      openRegistration: false
    };
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  changeState = (stateToChange) => {
    this.setState({
      [stateToChange]: !this.state[stateToChange]
    });
  };

  render() {
    const {anchorEl} = this.state;
    return (
      <div>

        <IconButton
          color='inherit'
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={()=>{this.changeState('openLogin')}}>Login</MenuItem>
          <MenuItem onClick={()=>{this.changeState('openRegistration')}} >Registration</MenuItem>
        </Menu>


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
    );
  }
}


export default AuthActions;
