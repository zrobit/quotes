import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class QuoteStore {
  @observable quotes = [];
  quote = {};
  author = {};
  section = '';
  @observable isLoading = false;

  setQuoteDetail(quote){
    this.quote = quote;
  }
  setAuthorDetail(author){
    this.author = author
    this.fetchAuthor();
  }

  fetchAuthor(){
    let self = this;
    self.isLoading = true;
    axios.get('/api/authors/' + self.author.slug)
      .then(function (response) {
        self.author = response.data.author
        self.isLoading = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static fromJS(data) {
    const quoteStore = new QuoteStore();
    if (data.type === 'authorModel') {
      quoteStore.author = data.author
      quoteStore.quotes = data.author.quotes.map(item => QuoteModel.fromJS(quoteStore, item))

    } else if (data.constructor === Array){
      quoteStore.quotes = data.map(item => QuoteModel.fromJS(quoteStore, item))
    } else if (data.constructor === Object) {
      quoteStore.quote = data;
    }
    return quoteStore;
  }
}
