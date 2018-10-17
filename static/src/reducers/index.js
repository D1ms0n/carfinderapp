import {combineReducers} from 'redux';
import form from './form.js';
import login from './login.js';
import localisation from './localisation.js';
import updatedParams from './snoops';

export default combineReducers({
  form,
  updatedParams,
  login,
  localisation
});