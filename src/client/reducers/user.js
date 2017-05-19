import { QUOTE_GET_ALL, QUOTE_GET } from '../actions/actionTypes'


export default function quotes(state={}, action) {
  switch (action.type) {
    case QUOTE_GET:
      return {...state, isLoading: true }

    default:
      return state
  }
};
