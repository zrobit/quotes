import * as types from '../actions/actionTypes'


export default function quotes(state={}, action) {
  switch (action.type) {
    case types.REQUEST_AUTHOR:
      return {...state, detail: action.payload, isLoading: true }

    case types.RECEIVE_AUTHOR:
      return {
        ...state,
        detail: action.payload.author,
        isLoading: false
      }

    default:
      return state
  }
};
