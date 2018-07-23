import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FormActions from '../actions/FormActions';
import * as PreLoaderActions from '../actions/PreLoaderActions';

import {withStyles} from "@material-ui/core/styles/index";
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './../components/Header/';
import Footer from './../components/Footer/';
import Form from './../components/Form/';
import Results from './../components/Results';
import SnoopsList from './../components/SnoopsList'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

const drawerWidth = 300;

const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  loaderWrapper: {
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%!important',
    height: '100%!important',
    backgroundColor: 'rgba(227, 242, 253, .4)',
    zIndex: 10000,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loader: {
    textAlign: 'center'
  },
  relative: {
    position: 'relative'
  }
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }
  handleDrawerToggle() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  };
  render() {
    const {submitForm} = this.props.FormActions;
    const {togglePreLoader} = this.props.PreLoaderActions;
    const {loading,classes} = this.props;
    const {drawerOpen} = this.state;
    const loader = (
      <div className={classes.loaderWrapper}>
        <CircularProgress className={classes.loader} size={50} />
      </div>
    );
    const drawer = (
      <Drawer
        variant='persistent'
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
        <SnoopsList items={[0,1,2,3]} />
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
            {drawer}
            <Header handleDrawerToggle={this.handleDrawerToggle}/>
        </Grid>
        <Grid
          container
          spacing={24}
          justify='center'>
          <Form
            submitForm={submitForm}
            togglePreLoader={togglePreLoader}
          />
          <Results />
        </Grid>
        <Footer />
        {( loading ? loader : null)}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.form.result,
    loading: state.loading.result,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    FormActions: bindActionCreators(FormActions, dispatch),
    PreLoaderActions: bindActionCreators(PreLoaderActions, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
