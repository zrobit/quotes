import * as types from '../actions/actionTypes'
import axios from 'axios'



export function requestAuthor(author) {
  return {
    type:   types.REQUEST_AUTHOR,
    payload: author
  }
}

export function receiveAuthor(json) {
  return {
    type: types.RECEIVE_AUTHOR,
    payload: json
  }
}

export function fetchAuthor(author) {
  return dispatch => {
    dispatch(requestAuthor(author));
    return axios.get('/api/authors/'+ author.slug)
      .then((response)=>{
        dispatch(receiveAuthor(response.data))
      }).catch((err)=>{
        console.log(err);
      })
  }
}
