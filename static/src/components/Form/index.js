import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import * as LoginActions from "../../actions/LoginActions";

import styles from './styles';
import testResults from './testResults';
import texts from '../../services/texts/index';

import ApiService from './../../services/api';
import config from './../../configs';
import countYears from './modules/CountYears';
import serialize from './../../services/serialize';
import {CookiesService} from './../../services/cookies';

import 'rc-slider/assets/index.css';
import 'react-select/dist/react-select.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from './../CustomButtons/Button.jsx';
import Slider from 'rc-slider';
import SelectWrapped from './modules/SelectWrapped';
import Card from './../Card/Card.jsx';
import CardBody from './../Card/CardBody.jsx';
import CardHeader from './../Card/CardHeader.jsx';
import CardFooter from './../Card/CardFooter.jsx';

const OLDEST_CARS = 30;
const years = countYears(OLDEST_CARS);
const startYear = years[0].value;
const endYear = years[years.length - 1].value;

const manufacturers = testResults.manufacturers;
const resultCars = testResults.resultCars;

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Form extends Component {

  constructor(props) {
    super(props);
    this.config = config();
    this.state = {
      redirect: true,
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

  handleMillageChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRangeYearsChange = value => {
    this.setState({
      year_min: value[0],
      year_max: value[1]
    });
  };

  updateForm = params => {
    this.setState({
      manufacturer: params['manufacturer'],
      model: params['model'],
      mileage_min: params['mileage_min'],
      mileage_max: params['mileage_max'],
      year_min: params['year_min'],
      year_max: params['year_max']
    });
    this.searchCars();
  };

  compareValues = (valMin,valMax) =>{

    valMin = Number(valMin);
    valMax = Number(valMax);

    const setNewState = (newValues) => {
      this.setState({
        mileage_min: newValues[0],
        mileage_max: newValues[1],
      });
    };
    if ( valMin > valMax ){
      setNewState([valMax,valMin]);
    }

  };

  searchCars = () => {
    this.props.submitForm([]);
    this.props.togglePreLoader(true);
    const searchParams = serialize(this.searchForm);
    const apiService = new ApiService();
    apiService.getRequest(`${this.config.cars}?${searchParams}`)
      .then((result)=>{
      }).catch((e)=>{
        console.log(e);
      });
    setTimeout( () => {
      this.props.submitForm(resultCars);
      this.props.togglePreLoader(false);
    },1000);
  };

  createSnoop = () => {
    if (this.state.redirect) {
      this.props.history.push('login',null);
    } else {
      this.props.submitForm([]);
      this.props.togglePreLoader(true);
      const searchParams = serialize(this.searchForm);
      const apiService = new ApiService();
      apiService.getRequest(`${this.config.snoops}?${searchParams}`)
        .then((result)=>{
        }).catch((e)=>{
        console.log(e);
      });
      setTimeout( () => {
        this.props.submitForm(resultCars);
        this.props.togglePreLoader(false);
      },1000);
    }
  };

  componentDidMount() {
    const userData = CookiesService.getCookie('user');
    if ( userData.length ) {
      this.props.LoginActions.login(JSON.parse(userData));
      this.setState({
        redirect: false,
        userInfo: this.props.login,
        login: JSON.parse(userData)
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateForm(nextProps.updatedParams)
  }

  render() {
    const {classes} = this.props;
    const {year_min,year_max} = this.state;
    const rangeValue = [year_min, year_max];
    const formTitle = ( this.state.login ? this.state.login.name : 'The best form in the world');
    return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} color='success'>
          {formTitle}
        </CardHeader>
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
                  {texts.texts.manufacturer}
                </Typography>
                <Input
                  fullWidth
                  inputComponent={SelectWrapped}
                  placeholder={texts.texts.manufacturer}
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
                  {texts.texts.model}
                </Typography>
                <Input
                  fullWidth
                  inputComponent={SelectWrapped}
                  placeholder={texts.texts.model}
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
                  {texts.texts.year}
                </Typography>
                <Input
                  fullWidth
                  inputComponent={SelectWrapped}
                  name='year_min'
                  placeholder={texts.texts.yearMin}
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
                  placeholder={texts.texts.yearMax}
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
                  {texts.texts.mileage}
                </Typography>
                <TextField
                  type='number'
                  id='mileage_min'
                  name='mileage_min'
                  label={texts.texts.km}
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
                  label={texts.texts.km}
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
                {texts.texts.searchText}
              </Button>
              <Button
                onClick = {this.createSnoop}
                type='button'
                className={classes.button}
              >
                {texts.texts.createSnoops}
              </Button>
            </Grid>
          </Grid>
        </CardFooter>
      </Card>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  togglePreLoader: PropTypes.func.isRequired,
  LoginActions: PropTypes.object.isRequired,
  submitForm: PropTypes.func.isRequired,
  updatedParams: PropTypes.object
};

const mapStateToProps = state => {
  return {
    updatedParams: state.updatedParams.result
  }
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch)
  }
};

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Form));