import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from "redux";
import {CookiesService} from './../../services/cookies';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import texts from '../../services/texts/index';
import * as LoginActions from '../../actions/LoginActions';
import PropTypes from "prop-types";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.texts = texts.texts;
    this.props = props;
    this.state = {
      email: '',
      password: ''
    };
    this.login = this.login.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cancel(){
    this.props.history.push('/');
  }

  login(){
    const data = {
      name: this.state.email,
      pass: this.state.password
    };
    this.props.LoginActions.login(data);
    const userInfo = {
      "name": "Werner Heisenberg",
      "email": data.name,
      "img":"https://juststickers.in/wp-content/uploads/2015/04/Heisenberg.png",
    };
    CookiesService.setCookie('user',JSON.stringify(userInfo),'1');
    this.props.history.push('/');
  }

  render(){
    const {classes} = this.props;
    return (
      <Grid item lg={4} md={4} sm={4} xs={11}>
        <div className={classes.root} >
          <DialogTitle id="form-dialog-title">
            Login
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              name="email"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
              fullWidth
            />
            <Link replace to="/registration">{this.texts.registration}</Link>

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.cancel}>
              {this.texts.cancel}
            </Button>
            <Button color="primary" onClick={this.login}>
              {this.texts.submit}
            </Button>
          </DialogActions>
        </div>
      </Grid>
    );
  }
}

Login.propTypes = {
  LoginActions: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    login: state.login.result,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
