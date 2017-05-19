import { combineReducers } from 'redux';

import quote from './quote';
import user from './user';
import author from './author';
// import quote from './auth';


const reducer = combineReducers({
  user,
  quote,
  author
})

export default reducer
