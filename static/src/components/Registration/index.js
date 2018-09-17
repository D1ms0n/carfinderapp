import React, { Component } from 'react';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles/index';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import localisation from "../../services/translations";
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './../../components/Snackbar';

const styles = (theme) => ({
  root: {
    flexGrow: 1
  },
  routeLink: {
    position: 'relative',
    top: 8
  }
});

class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      rePassword: '',
      formValid: false,
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      rePasswordValid: false,
      formErrors: {
        name: '',
        email: '',
        password: '',
        rePassword: ''
      }
    };
    this.cancel = this.cancel.bind(this);
  }

  cancel = (history) => {
    history.push('/');
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => { this.validateField(name,value) });
  };

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let rePasswordValid = this.state.rePasswordValid;

    switch(fieldName) {
      case 'name':
        nameValid = validator.isLength(value,{min:2, max: undefined});
        fieldValidationErrors.name = nameValid ? '' : localisation.isInvalid;
        break;
      case 'email':
        emailValid = validator.isEmail(value);
        fieldValidationErrors.email = emailValid ? '' : localisation.isInvalid;
        break;
      case 'password':
        passwordValid = validator.isAlphanumeric(value)
          && validator.isLength(value,{min:5, max: undefined});
        fieldValidationErrors.password = passwordValid ? '' : localisation.isInvalid;
        break;
      case 'rePassword':
        rePasswordValid = validator.isAlphanumeric(value)
          && validator.isLength(value,{min:5, max: undefined});
        fieldValidationErrors.rePassword =
          rePasswordValid && this.state.rePassword === this.state.password
            ? '' : localisation.isInvalid;
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid: passwordValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      rePasswordValid: rePasswordValid
    }, this.validateForm);
  }

  validateForm() {

    this.setState({
      formValid:
      this.state.nameValid
      && this.state.emailValid
      && this.state.passwordValid
      && this.state.rePasswordValid
    });

  }

  showMss(){
    this.setState({
      snackBarOpen: true,
      variant: "error",
      message: localisation.emptyFieldsMss
    });
  }

  saveUser(){
    this.props.history.push('/');
  }

  register(){
    ( this.state.formValid ? this.saveUser(): this.showMss() )
  }

  render(){
    const {classes} = this.props;
    return (
      <Route render={({history}) => (
        <Grid item lg={4} md={4} sm={4} xs={11}>
          <div className={classes.root}>
            <DialogTitle id="form-dialog-title">
              {localisation.registration}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label={localisation.name}
                type="text"
                fullWidth
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.name}</FormHelperText>

              <TextField
                margin="dense"
                id="email"
                name="email"
                label={localisation.emailText}
                type="email"
                fullWidth
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.email}</FormHelperText>

              <TextField
                margin="dense"
                id="password"
                name="password"
                label={localisation.password}
                type="password"
                value={this.state.password}
                fullWidth
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.password}</FormHelperText>

              <TextField
                margin="dense"
                id="rePassword"
                name="rePassword"
                label={localisation.rePassword}
                type="password"
                value={this.state.rePassword}
                fullWidth
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.rePassword}</FormHelperText>

              <Link className={classes.routeLink} replace to="/login">{localisation.login}</Link>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={()=>{this.cancel(history)}}>
                {localisation.cancel}
              </Button>
              <Button color="primary" onClick={()=>{this.register()}}>
                {localisation.submit}
              </Button>
            </DialogActions>
          </div>
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
      )} />
    )
  }
}

const mapStateToProps = state => {
  return {
    localisationCode: state.localisation.result
  }
};

export default withStyles(styles)(connect(mapStateToProps)(Registration));
