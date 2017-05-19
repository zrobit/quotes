import {observable, computed, action} from "mobx";
import QuoteModel from '../models/QuoteModel'
import axios from 'axios'

export default class QuoteStore {
  @observable quotes = [];
  @observable detail = {};
  @observable author = {};
  @observable isLoading = false;
  next;

  setQuoteDetail(quote){
    this.detail = quote;
  }

  fetchQuotes(cb){
     let self = this;
    axios.get('/api/quotes?page=' + this.next)
    .then((response)=>{
      self.quotes.push(...response.data.quotes);
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
    }
    return store;
  }
}
