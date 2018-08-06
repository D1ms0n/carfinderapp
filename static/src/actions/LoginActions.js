import { LOGIN } from '../constants';

export function login(result) {

  return {
    type: LOGIN,
    payload: result
  };

}