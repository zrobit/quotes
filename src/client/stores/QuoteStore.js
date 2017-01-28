import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'

export default class QuoteStore {
  @observable quotes = [];
  quote = {};
  author = {}

  setQuoteDetail(quote){
    this.quote = quote;
  }
  setAuthorDetail(author){
    this.author = author
  }

  static fromJS(data) {
    const quoteStore = new QuoteStore();
    if (data.type === 'authorModel') {
      quoteStore.author = data.author
      quoteStore.quotes = data.quotes.map(item => QuoteModel.fromJS(quoteStore, item))

    } else if (data.constructor === Array){
      quoteStore.quotes = data.map(item => QuoteModel.fromJS(quoteStore, item))
    } else if (data.constructor === Object) {
      quoteStore.quote = data;
    }
    return quoteStore;
  }
}
