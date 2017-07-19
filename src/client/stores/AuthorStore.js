import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class AuthorStore {
  @observable author = {};
  @observable bio = {}
  @observable quotes = [];
  @observable isLoading = false;
  next=1;

  setAuthorDetail(author){
    this.author = author
    this.isLoading = true;
    this.quotes = []
    this.next = 1
    this.fetchQuotes();
    this.fetchAuthor();
  }

  setAuthor(author){
    this.author = author
  }

  fetchQuotes(cb){
    let self = this;
    if(self.next===null){
      return;
    }
    self.isLoading = true;
    axios.get('/api/quotes/author/'+self.author.id+'?page=' + self.next)
    .then(function (response) {
      self.quotes.push(...response.data.quotes);
      self.next = response.data.next
      self.isLoading = false
      cb();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  fetchAuthor(){
    let self = this;
    self.isLoading = true;
    axios.get('/api/authors/' + self.author.id)
    .then(function (response) {
      self.author = response.data.author
      // self.bio = response.data.author.bio
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
      store.author = state.detail
      store.quotes = state.detail.quotes
    }
    return store;
  }
}
