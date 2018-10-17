import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as LoginActions from "../../actions/LoginActions";
import styles from './styles';
import { CookiesService } from './../../services/cookies';
// import ApiService from './../../services/api';
// import serialize from './../../services/serialize';
import config from './../../configs';

import testResults from './testResults';
import localisation from "../../services/translations";
import countYears from './modules/CountYears';
import LinearProgress from '@material-ui/core/LinearProgress';

import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Collapse from '@material-ui/core/Collapse';
import Button from './../CustomButtons/Button.jsx';
import Slider from 'rc-slider';
import SelectWrapped from './modules/SelectWrapped';
import Card from './../Card/Card.jsx';
import CardBody from './../Card/CardBody.jsx';
import CardHeader from './../Card/CardHeader.jsx';
import CardFooter from './../Card/CardFooter.jsx';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './../../components/Snackbar';
import * as changeLangActions from "../../actions/changeLangActions";

const years = countYears();
const startYear = years[0].value;
const endYear = years[years.length - 1].value;
const manufacturers = testResults.manufacturers;
const resultCars = testResults.resultCars;
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Form extends Component {

  constructor(props) {
    super(props);
    this.config = config;
    // this.apiService =  new ApiService();
    this.state = {
      redirect: true,
      formHidden: false,
      loading: false,
      login: false,
      years: null,
      manufacturers: null,
      models: null,
      manufacturer: '',
      model: '',
      mileage_min: 0,
      mileage_max: 100,
      year_min: startYear,
      year_max: endYear
    };
  }
  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };
  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState( ()=> ({ snackBarOpen: false }));
  };
  handleMillageChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState( ()=> ({
        [name]: value
    }));
  };
  handleRangeYearsChange = value => {
    this.setState( ()=> ({
      year_min: value[0],
      year_max: value[1]
    }));
  };
  toggleFrom = () =>{
    const mobileDevisesWidth = 600;
    if ( window.innerWidth > mobileDevisesWidth ){
      return
    }
    this.setState( ()=> ({
      formHidden: !this.state.formHidden
    }));
  };
  updateForm = params => {
    if (Object.keys(params).length === 0 
      && params.constructor === Object){
      return;
    }

    this.setState( ()=> ({
      manufacturer: params['manufacturer'],
      model: params['model'],
      mileage_min: params['mileage_min'],
      mileage_max: params['mileage_max'],
      year_min: params['year_min'],
      year_max: params['year_max']
    }));

    this.searchCars();
  };
  searchCars = () => {

    this.setState( ()=> ({
      loading: true
    }));

    this.toggleFrom();

    setTimeout( () => {
      this.setState( ()=> ({
        loading: false
      }));
      this.props.submitForm(resultCars);
    },1000);

  };
  createSnoop = () => {
    if (this.state.redirect) {
      this.props.history.push('login',null);
    } else {
      this.toggleFrom();
      // const searchParams = serialize(this.searchForm);
      // this.apiService.getRequest(`${this.config.cars}?${searchParams}`)
      //   .then((result)=>{
      //   })
      //   .catch((e)=>{
      //     console.log(e);
      //   });
      setTimeout( () => {
        this.props.submitForm(resultCars);
      },1000);
    }
  };
  componentDidMount() {
    const userData = CookiesService.getCookie('user');
    if ( userData.length ) {
      this.props.LoginActions.login(JSON.parse(userData));

      this.setState( ()=> ({
        redirect: false,
        userInfo: this.props.login,
        login: JSON.parse(userData),
        snackBarOpen: true,
        variant: "success",
        message: `${localisation.welcome}, ${JSON.parse(userData).name}!`
      }));
    }
  }
  componentWillReceiveProps(nextProps) {
    this.updateForm(nextProps.updatedParams)
  }
  render() {
    const {classes} = this.props;
    const {year_min,year_max,loading} = this.state;
    const rangeValue = [year_min, year_max];
    const formTitle = ( this.state.login ? this.state.login.name : localisation.formTitle);
    return (
      <Card className={classes.card}>
        <CardHeader
          onClick={this.toggleFrom}
          className={classes.cardHeader}
          color='success'>
          {formTitle}
        </CardHeader>
        <Collapse
          in={!this.state.formHidden}
          collapsedHeight="10px"
        >
          <CardBody>
            <form
              noValidate
              autoComplete='off'
              ref={(ref) => { this.searchForm = ref; }}
            >
              <Grid
                container
                spacing={24}
                justify='center'
                direction='row'
              >
                <Grid className={classes.paperRelative} item lg={12} md={12} sm={12} xs={12}>
                  <Typography className={classes.subheading} variant='subheading'>
                    {localisation.manufacturer}
                  </Typography>
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    placeholder={localisation.manufacturer}
                    inputProps={{
                      classes,
                      name: 'manufacturer',
                      instanceId: 'manufacturer',
                      simpleValue: true,
                      options: manufacturers,
                    }}
                    value={this.state.manufacturer}
                    onChange={this.handleChange('manufacturer')}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={24}
                justify='center'
                direction='row'
              >
                <Grid className={classes.paperRelative} item lg={12} md={12} sm={12} xs={12}>
                  <Typography className={classes.subheading} variant='subheading'>
                    {localisation.model}
                  </Typography>
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    placeholder={localisation.model}
                    inputProps={{
                      classes,
                      name: 'model',
                      instanceId: 'model',
                      simpleValue: true,
                      options: manufacturers,
                    }}
                    value={this.state.model}
                    onChange={this.handleChange('model')}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={24}
                justify='center'
                direction='row'
              >
                <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={6}>
                  <Typography className={classes.subheading} variant='subheading'>
                    {localisation.year}
                  </Typography>
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    name='year_min'
                    placeholder={localisation.yearMin}
                    inputProps={{
                      classes,
                      name: 'year_min',
                      instanceId: 'year_min',
                      simpleValue: true,
                      options: years,
                    }}
                    value={this.state.year_min}
                    onChange={this.handleChange('year_min')}
                  />
                </Grid>
                <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={6}>
                  <Typography className={classes.subheading} variant='subheading'>
                  </Typography>
                  <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    name='year_max'
                    placeholder={localisation.yearMax}
                    inputProps={{
                      classes,
                      name: 'year_max',
                      instanceId: 'year_max',
                      simpleValue: true,
                      options: years,
                    }}
                    value={this.state.year_max}
                    onChange={this.handleChange('year_max')}
                  />
                </Grid>
                <Grid className={classes.paperRelative} item lg={12} md={12} sm={12} xs={12}>
                  <Range
                    onChange={this.handleRangeYearsChange}
                    min={startYear}
                    max={endYear}
                    value={rangeValue}
                    tipFormatter={value => `${value}`}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={24}
                justify='center'
                direction='row'>
                <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={6}>
                  <Typography className={classes.subheading} variant='subheading'>
                    {localisation.mileage}
                  </Typography>
                  <TextField
                    type='number'
                    id='mileage_min'
                    name='mileage_min'
                    label={localisation.km}
                    className={classes.mileageField}
                    onChange={this.handleMillageChange}
                    value={this.state.mileage_min}
                  />
                </Grid>
                <Grid className={classes.paperRelative} item lg={6} md={6} sm={6} xs={6}>
                  <Typography className={classes.subheading} variant='subheading'>
                  </Typography>
                  <TextField
                    type='number'
                    id='mileage_max'
                    name='mileage_max'
                    label={localisation.km}
                    className={classes.mileageField}
                    onChange={this.handleMillageChange}
                    value={this.state.mileage_max}
                  />
                </Grid>
              </Grid>

            </form>
          </CardBody>
          <CardFooter>
            <Grid
              container
              spacing={24}
              justify='center'
              direction='row'>
              <Grid className={classes.paperRelative} item lg={12} md={12} sm={12} xs={12}>
                <Button
                  onClick = {this.searchCars}
                  type='button'
                  className={classes.button}
                >
                  {localisation.searchText}
                </Button>
                <Button
                  onClick = {this.createSnoop}
                  type='button'
                  className={classes.button}
                >
                  {localisation.createSnoops}
                </Button>

                { loading ? <LinearProgress /> : null}
              </Grid>
            </Grid>
          </CardFooter>
        </Collapse>
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
      </Card>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  LoginActions: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  updatedParams: PropTypes.object
};

const mapStateToProps = state => {
  return {
    updatedParams: state.updatedParams.result,
    localisationCode: state.localisation.result
  }
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch),
    changeLangActions: bindActionCreators(changeLangActions, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Form));