import {observable} from 'mobx';
import axios from 'axios';

import QuoteModel from '../models/quote-model';

export default class QuoteStore {
  @observable quotes = [];
  @observable quote = {};
  @observable isLoading = false;
  next;

  setQuoteDetail(quote) {
    this.quote = quote;
  }

  fetchQuotes(cb) {
    const self = this;
    self.isLoading = true;
    axios.get('/api/quotes?page=' + self.next)
    .then(response => {
      self.quotes.push(...response.data.quotes);
      self.next = response.data.next;
      self.isLoading = false;
      cb();
    })
    .catch(err => {
      console.log(err);
    });
  }
  fetchQuotesByHome() {
    const self = this;
    if (self.quotes !== undefined) {
      return;
    }
    self.isLoading = true;
    self.next = 1;
    axios.get('/api/quotes?page=1')
    .then(response => {
      self.quotes = response.data.quotes;
      self.next = response.data.next;
      self.isLoading = false;
    })
    .catch(err => {
      console.log(err);
    });
  }
  mapQuotes(store, list) {
    this.quotes = list.map(item => QuoteModel.fromJS(store, item));
  }

  static fromJS(state = {}) {
    const store = new QuoteStore();
    if (state) {
      store.quotes = state.quotes;
      store.next = state.next;
      if (state.detail) {
        store.quote = state.detail;
      }
    }
    return store;
  }
}
