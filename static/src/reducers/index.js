import {combineReducers} from 'redux';
import form from './form.js';
import loading from './preloader.js';
import updatedParams from './snoops';

export default combineReducers({
  form,
  loading,
  updatedParams
});