import { SUBMIT_FORM } from '../constants';

export function submitForm(result) {

  return {
    type: SUBMIT_FORM,
    payload: result
  };

}