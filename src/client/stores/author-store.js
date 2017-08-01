import {observable} from 'mobx';
import axios from 'axios';
import QuoteModel from '../models/QuoteModel';

export default class AuthorStore {
  @observable author = {};
  @observable bio = {}
  @observable quotes = [];
  @observable isLoading = false;
  next=1;

  setAuthorDetail(author) {
    this.author = author;
    this.isLoading = true;
    this.quotes = [];
    this.next = 1;
    this.fetchQuotes();
    this.fetchAuthor();
  }
  setAuthor(author) {
    this.author = author;
  }
  fetchQuotes(cb) {
    const self = this;
    if (self.next === null) {
      return;
    }
    self.isLoading = true;
    axios.get('/api/quotes/author/' + self.author.id + '?page=' + self.next)
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
  fetchAuthor() {
    const self = this;
    self.isLoading = true;
    axios.get('/api/authors/' + self.author.id)
    .then(response => {
      self.author = response.data.author;
      // self.bio = response.data.author.bio
      self.isLoading = false;
    })
    .catch(err => {
      console.log(err);
    });
  }
  mapQuotes(store, list) {
    this.quotes = list.map(item => QuoteModel.fromJS(store, item));
  }
  static fromJS(state) {
    const store = new AuthorStore();
    if (state) {
      store.author = state.detail;
      store.quotes = state.detail.quotes;
    }
    return store;
  }
}
