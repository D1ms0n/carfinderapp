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

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class Registration extends Component {
  constructor(props) {
    super(props);
    this.texts = texts.texts;
    this.cancel = this.cancel.bind(this);
  }
  cancel(history){
    history.push('/');
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
                id="text"
                label="Name"
                type="text"
                fullWidth
              />
              <TextField
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
              <TextField
                margin="dense"
                id="rePassword"
                label="Re-Password"
                type="password"
                fullWidth
              />
              <Link replace to="/login">{this.texts.login}</Link>
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
