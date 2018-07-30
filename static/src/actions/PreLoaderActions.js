import { TOOGLE_PRELOADER } from '../constants';

export function togglePreLoader(result) {

  return {
    type: TOOGLE_PRELOADER,
    payload: result
  };

}