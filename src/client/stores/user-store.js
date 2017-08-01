import {observable, computed, action} from 'mobx';
import axios from 'axios';
import QuoteModel from '../models/QuoteModel';

export default class UserStore {
  isAuth = false;
  name = null;
  hashId = null;
  static fromJS(state) {
    const store = new UserStore();
    if (state) {
      store.isAuth = state.isAuth;
      store.name = state.name;
      store.hashId = state.hashId;
    }
    return store;
  }
}
