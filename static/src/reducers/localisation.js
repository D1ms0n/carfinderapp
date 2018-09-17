
import { CHANGE_LANG } from '../constants';

const initialState = {
  result: 'gb'
};

export default function form(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANG:
      return { ...state, result: action.payload };
    default:
      return state;
  }
}