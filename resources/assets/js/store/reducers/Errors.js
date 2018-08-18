import { LOGIN_FAILED } from '../action-types';

export default function errors(state = [], action) {
  switch (action.type) {
    case LOGIN_FAILED:
      console.log("payload", action.payload);
      return [...action.payload];
    default:
      return state;
  }
}