
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as FormActions from '../../actions/FormActions';
import * as PreLoaderActions from '../../actions/PreLoaderActions';
import * as UpdateForm from '../../actions/UpdateForm';

import styles from './styles';
import classNames from 'classnames';

import Footer from '../../components/Footer/index';
import Form from '../../components/Form/index';
import Results from '../../components/Results/index';
import SnoopsList from '../../components/SnoopsList/index';
import AppBar from './../../components/AppBar';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }

  handleDrawerToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  render() {
    const {submitForm} = this.props.FormActions;
    const {togglePreLoader} = this.props.PreLoaderActions;
    const {updateForm} = this.props.UpdateForm;
    const {classes} = this.props;
    const {drawerOpen} = this.state;
    const drawer = (
      <Drawer
        variant="persistent"
        anchor='left'
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <SnoopsList updateForm={updateForm}/>
        <Divider />
      </Drawer>
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid
          container
          spacing={24}
          justify='center'
        >
          <Grid item lg={10} md={10} sm={10} xs={12}>
            <div className={classes.root}>
              <div className={classes.appFrame}>
                <AppBar drawerOpen={drawerOpen} handleDrawerToggle={this.handleDrawerToggle}/>
                {drawer}
                <main
                  className={classNames(classes.content, classes['content-left'], {
                    [classes.contentShift]: drawerOpen,
                    [classes['contentShift-left']]: drawerOpen,
                  })}
                >
                  <div className={classes.drawerHeader} />
                  <Grid
                    container
                    spacing={24}
                    justify='center'
                  >
                    Not about
                  </Grid>
                </main>
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  FormActions: PropTypes.object.isRequired,
  PreLoaderActions: PropTypes.object.isRequired,
  UpdateForm: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    items: state.form.result,
    loading: state.loading.result,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    FormActions: bindActionCreators(FormActions, dispatch),
    PreLoaderActions: bindActionCreators(PreLoaderActions, dispatch),
    UpdateForm: bindActionCreators(UpdateForm, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
