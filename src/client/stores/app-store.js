import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class AppStore {
  @observable quotes = [];
  quote = {};
  @observable author = {};
  @observable isLoading = false;
  isAuth = false;
  userName = null;
  userHashId = null;


  fetchHome(){
    let self = this;
    axios.get('/api/home')
    .then(function (response) {
      self.quotes = response.data.quotes;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  static fromJS(state={}) {
    const appStore = new AppStore();
    appStore.isAuth = state.isAuth;
    if(appStore.isAuth){
      appStore.userName = state.userName;
      appStore.userHashId = state.userHashId;
    }
    if (state.ref === 'QuoteSection'){
      appStore.quote = state.data.quote
    }
    else if (state.ref === "AuthorSection") {
      appStore.author = state.data.author
      appStore.quotes = state.data.author.quotes.map(item => QuoteModel.fromJS(appStore, item))
    }
    else if (state.ref==='HomeSection'){
      appStore.quotes = state.data.quotes.map(item => QuoteModel.fromJS(appStore, item))
    }

    return appStore;
  }
}
