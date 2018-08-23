import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import texts from '../../services/texts/index';
import Grid from '@material-ui/core/Grid';
import validator from 'validator';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    this.texts = texts.texts;
    this.state = {
      formValid: false,
      nameValid: true,
      emailValid: true,
      passwordValid: true,
      rePasswordValid: true,
      formErrors: {
        name: '',
        email: '',
        password: '',
        rePassword: ''
      }
    };
    this.cancel = this.cancel.bind(this);
  }

  cancel(history){
    history.push('/');
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    }, () => { this.validateField(name,value) });
  };

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let emailValid = this.state.emailValid;

    switch(fieldName) {
      case 'password':
        passwordValid = validator.isAlphanumeric(value)
          && validator.isLength(value,{min:5, max: undefined});
        fieldValidationErrors.password = passwordValid ? '': 'is invalid';
        break;
      case 'email':
        emailValid = validator.isEmail(value);
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

  render(){
    const {classes} = this.props;
    return (
      <Route render={({history}) => (
        <Grid item lg={4} md={4} sm={4} xs={11}>
          <div className={classes.root}>
            <DialogTitle id="form-dialog-title">
              Registration
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                label="name"
                type="text"
                fullWidth
                error={!this.state.emailValid}
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.name}</FormHelperText>

              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                error={!this.state.emailValid}
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.email}</FormHelperText>

              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                error={!this.state.emailValid}
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.password}</FormHelperText>

              <TextField
                margin="dense"
                id="rePassword"
                name="rePassword"
                label="Re-Password"
                type="password"
                fullWidth
                error={!this.state.emailValid}
                onChange={this.handleChange}
              />
              <FormHelperText error>{this.state.formErrors.rePassword}</FormHelperText>

              <Link className={classes.routeLink} replace to="/login">{this.texts.login}</Link>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={()=>{this.cancel(history)}}>
                {this.texts.cancel}
              </Button>
              <Button color="primary" onClick={()=>{this.cancel(history)}}>
                {this.texts.submit}
              </Button>
            </DialogActions>
          </div>
        </Grid>
      )} />
    )
  }
}

export default withStyles(styles)(Registration);
