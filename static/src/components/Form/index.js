import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Link} from "react-router-dom";

import styles from './styles';
import testResults from './testResults';
import texts from '../../services/texts/index';

import ApiService from './../../services/api';
import config from './../../configs';
import countYears from './modules/CountYears';
import serialize from './../../services/serialize';

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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

  componentWillReceiveProps(nextProps) {
    this.updateForm(nextProps.updatedParams)
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
    this.props.togglePreLoader(true);
    const searchParams = serialize(this.searchForm);
    const apiService = new ApiService();
    apiService.postRequest(this.config.snoops,searchParams)
      .then((result)=>{
        console.log(result);
      }).catch((e)=>{
        console.log(e);
      });
    setTimeout( () => {
      this.props.submitForm(resultCars);
      this.props.togglePreLoader(false);
    },1000);
  };

  render() {
    const {classes} = this.props;
    const {year_min,year_max} = this.state;
    const rangeValue = [year_min, year_max];
    return (
      <Grid className={classes.grid} item lg={3} md={4} sm={4} xs={11}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} color='success'>
            The best form in the world
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

        <Typography variant="subheading" gutterBottom>
          Test routs
        </Typography>
        <List component="nav">
          <ListItem button>
            <Link to="/about">
              <ListItemText primary="About" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/notabout">
              <ListItemText primary="Not about" />
            </Link>
          </ListItem>
        </List>
      </Grid>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  togglePreLoader: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  updatedParams: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    updatedParams: state.updatedParams.result
  }
};

export default withStyles(styles)(connect(mapStateToProps)(Form));