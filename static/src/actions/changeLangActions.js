import { CHANGE_LANG } from '../constants';

export function changeLang(result) {

  return {
    type: CHANGE_LANG,
    payload: result
  };

}