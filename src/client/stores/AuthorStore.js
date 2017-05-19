import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class AuthorStore {
  @observable quotes = [];
  @observable author = {};
  @observable isLoading = false;
  next;

  setAuthorDetail(author){
    this.author = author
    this.quotes = []
    this.fetchAuthor();
  }

  fetchQuotes(cb){
    let self = this;
    axios.get('/api/quotes')
    .then(function (response) {
      self.quotes.push(...response.data);
      cb();
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
      // self.mapQuotes(self, self.author.quotes)

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
    const store = new AuthorStore();
    if (state){
      store.author = state

    }

    return store;
  }
}
