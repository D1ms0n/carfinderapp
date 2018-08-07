
import { LOGIN } from '../constants';

const initialState = {
  data: false
};

export default function loading(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}