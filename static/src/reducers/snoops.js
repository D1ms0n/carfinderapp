import { UPDATE_FORM } from '../constants';

const initialState = {
  result: {}
};

export default function updatedParams(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FORM:
      return { ...state, result: action.payload };
    default:
      return state;
  }
}