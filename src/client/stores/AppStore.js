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
  setQuoteDetail(quote){
    this.quote = quote;
  }
  setAuthorDetail(author){
    this.author = author
    this.quotes = []
    this.fetchAuthor();
  }
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
  fetchAuthor(){
    let self = this;
    self.isLoading = true;
    axios.get('/api/authors/' + self.author.slug)
    .then(function (response) {
      self.author = response.data.author
      self.mapQuotes(self, self.author.quotes)
      self.isLoading = false;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  mapQuotes(store, list){

    this.quotes = list.map((item) => QuoteModel.fromJS(store, item))
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
