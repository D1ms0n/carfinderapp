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
import FormErrors from './modules/FormErrors';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './../../components/Snackbar';
import texts from '../../services/texts/index';
import * as LoginActions from '../../actions/LoginActions';
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class Login extends Component {

  constructor(props) {
    super(props);
    this.texts = texts.texts;
    this.props = props;
    this.state = {
      email: '',
      password: '',
      snackBarOpen: false,
      formValid: false,
      emailValid: false,
      passwordValid: false,
      formErrors: {
        email: '',
        password: ''
      }
    };
    this.login = this.login.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => { this.validateField(name,value) });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackBarOpen: false });
  };

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;

    switch(fieldName) {
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.name = passwordValid ? '': 'enter the password';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: passwordValid,
      emailValid: emailValid
    }, this.validateForm);

  }

  validateForm() {

    this.setState({
      formValid:
      this.state.nameValid
      && this.state.emailValid
    });

  }

  cancel(){
    this.props.history.push('/');
  }

  showMss(){
    this.setState({
      snackBarOpen: true,
      variant: "error",
      message: "Fill all fields!"
    });
  }

  saveUser(){
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

  login(){
    ( this.state.formValid ? this.saveUser(): this.showMss())
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
        <FormErrors formErrors={this.state.formErrors} />


        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
        >
          <MySnackbarContentWrapper
            onClose={this.handleCloseSnackbar}
            variant={this.state.variant}
            message={this.state.message}
          />
        </Snackbar>


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
