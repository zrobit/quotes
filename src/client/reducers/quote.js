import * as types from '../actions/actionTypes'


export default function quote(state={}, action) {
  switch (action.type) {
    case types.QUOTE_GET:
      return {...state, isLoading: true }

    case types.QUOTE_SET_DETAIL:
      return {...state, detail: action.payload.quote }

    case types.REQUEST_QUOTES:
      return {
        ...state,
        isLoading: true,
      }

    case types.RECEIVE_QUOTES:
      return {
        ...state,
        quotes: [...state.quotes, ...action.payload.quotes],
        next: action.payload.next,
        isLoading: false
      }

    default:
      return state
  }
};
