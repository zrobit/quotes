import * as types from '../actions/actionTypes'
import axios from 'axios'

export function setQuoteDetail(quote) {
  return {
    type: types.QUOTE_SET_DETAIL,
    payload: {
      quote: quote
    }
  }
}

export function requestQuotes() {
  return {
    type: types.REQUEST_QUOTES
  }
}

export function receiveQuotes(json) {
  return {
    type: types.RECEIVE_QUOTES,
    payload: json
  }
}

export function fetchQuotes(isLoading, next) {
  return (dispatch, getState) => {
    if(!isLoading){
      dispatch(requestQuotes());
      return axios.get('/api/quotes?page='+ next)
        .then((response)=>{
          dispatch(receiveQuotes(response.data))
        }).catch((err)=>{
          console.log(err);
        })
    } else {
      return Promise.resolve()
    }
  }
}
