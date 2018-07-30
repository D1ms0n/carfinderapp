
import { UPDATE_FORM } from '../constants';

export function updateForm(result) {

  return {
    type: UPDATE_FORM,
    payload: result
  };

}