import {observable} from 'mobx';
import axios from 'axios';
import QuoteModel from '../models/quote-model';

export default class AppStore {
  @observable quotes = [];
  quote = {};
  @observable author = {};
  @observable isLoading = false;
  isAuth = false;
  userName = null;
  userHashId = null;

  fetchHome() {
    const self = this;
    axios.get('/api/home')
    .then(response => {
      self.quotes = response.data.quotes;
    })
    .catch(err => {
      console.log(err);
    });
  }

  static fromJS(state = {}) {
    const appStore = new AppStore();
    appStore.isAuth = state.isAuth;
    if (appStore.isAuth) {
      appStore.userName = state.userName;
      appStore.userHashId = state.userHashId;
    }
    if (state.ref === 'QuoteSection') {
      appStore.quote = state.data.quote;
    } else if (state.ref === 'AuthorSection') {
      appStore.author = state.data.author;
      appStore.quotes = state.data.author.quotes.map(item => QuoteModel.fromJS(appStore, item));
    } else if (state.ref === 'HomeSection') {
      appStore.quotes = state.data.quotes.map(item => QuoteModel.fromJS(appStore, item));
    }
    return appStore;
  }
}
