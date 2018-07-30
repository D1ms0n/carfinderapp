
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as FormActions from '../../actions/FormActions';
import * as PreLoaderActions from '../../actions/PreLoaderActions';
import * as UpdateForm from '../../actions/UpdateForm';

import text from '../../services/texts/index';
import styles from './styles';
import classNames from 'classnames';

import Footer from '../../components/Footer/index';
import Form from '../../components/Form/index';
import Results from '../../components/Results/index';
import SnoopsList from '../../components/SnoopsList/index';
import AuthActions from '../../components/Header/index';

import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
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
                      onClick={this.handleDrawerToggle}
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
                      {text.texts.headerTitle}
                    </Typography>
                    <AuthActions />
                  </Toolbar>
                </AppBar>
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
                    <Form
                      submitForm={submitForm}
                      togglePreLoader={togglePreLoader}
                    />
                    <Results />
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
