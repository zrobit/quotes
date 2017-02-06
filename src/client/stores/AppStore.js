import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class AppStore {
  @observable quotes = [];
  quote = {};
  @observable author = {};
  @observable isLoading = false;

  setQuoteDetail(quote){
    this.quote = quote;
  }
  setAuthorDetail(author){
    this.author = author
    this.quotes = []
    this.fetchAuthor();
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

  static fromJS(state) {
    const appStore = new AppStore();
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
