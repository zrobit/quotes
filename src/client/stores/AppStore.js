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

  static fromJS(data) {
    const appStore = new AppStore();
    if (data.type === 'authorModel') {
      appStore.author = data.author
      appStore.quotes = data.author.quotes.map(item => QuoteModel.fromJS(appStore, item))

    } else if (data.constructor === Array){
      appStore.quotes = data.map(item => QuoteModel.fromJS(appStore, item))
    } else if (data.constructor === Object) {
      appStore.quote = data;
    }
    return appStore;
  }
}
