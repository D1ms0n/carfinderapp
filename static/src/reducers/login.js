
import { LOGIN } from '../constants';

export default function loading(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}