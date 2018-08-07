
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {
  Route,
  Switch
} from 'react-router-dom';

import styles from './styles';
import classNames from 'classnames';

import FormContainer from './../../containers/Form';
import SnoopsListContainer from '../../containers/Snoops';
import Footer from '../../components/Footer/index';
import Header from './../../components/Header';
import Registration from './../../components/Registration';
import Login from './../../components/Login';
import Logout from './../../components/Logout';
import NotFound from './../../components/NotFound';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {CookiesService} from "../../services/cookies";

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
        <SnoopsListContainer/>
        <Divider />
      </Drawer>
    );
    return (
      <div>
        <Grid
          container
          spacing={24}
          justify='center'
        >
          <Grid item lg={10} md={10} sm={10} xs={12}>
            <div className={classes.root}>
              <div className={classes.appFrame}>

                <Header drawerOpen={drawerOpen} handleDrawerToggle={this.handleDrawerToggle}/>
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

                    <Switch>
                      <Route exact path="/" component={FormContainer} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/registration" component={Registration} />
                      <Route exact path="/logout" component={Logout} />
                      <Route component={NotFound} />
                    </Switch>

                  </Grid>
                </main>
              </div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
