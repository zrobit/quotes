import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class QuoteStore {
  @observable quotes = [];
  @observable quote = {};
  @observable isLoading = false;
  next;

  setQuoteDetail(quote){
    this.quote = quote;
  }

  fetchQuotes(cb){
    let self = this;
    self.isLoading = true;
    axios.get('/api/quotes?page=' + self.next)
    .then((response)=>{
      self.quotes.push(...response.data.quotes);
      self.next = response.data.next
      self.isLoading = false
      cb();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  mapQuotes(store, list){
    this.quotes = list.map((item) => QuoteModel.fromJS(store, item))
  }

  static fromJS(state={}) {
    const store = new QuoteStore();
    if(state){
      store.quotes = state.quotes;
      store.next = state.next;
      if(state.detail){
        store.quote = state.detail
      }
    }

    return store;
  }
}
