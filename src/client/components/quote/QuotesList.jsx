import React, { Component } from 'react'

import { connect } from 'react-redux'

import hash from '../../utils/hash'

import QuoteItem from './QuoteItem'


class QuotesList extends Component {
  waiting = false;
  endScrollHandle = null;
  delta = null;
  newDelta = null;
  repose = null;
  oldCola = 0;
  cola = 1;
  grid = null;

  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  quoteItem(quote, author= quote.author) {
    return (
      <QuoteItem key={hash()} quote={quote} author={author} />
    );
  }
  render() {
    const {quotes, author, isLoading} = this.props
    return (
      <div id="grid">
      { quotes ?  quotes.map(quote => this.quoteItem(quote, author)) : null }

      { isLoading ? <span>Cargando...</span> : null }

      </div>
    );
  }

  componentDidMount() {
    if(this.props.next){
      window.addEventListener('scroll', this.handleScroll);
      this.grid = document.getElementById('grid');
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.next === null){
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let self = this;
    if(self.waiting){
      return;
    }
    self.waiting = true;
    clearTimeout(self.endScrollHandle);
    self.scroll();
    setTimeout(function(){
      self.waiting = false;
    }, 300);
    self.endScrollHandle = setTimeout(function(){
      self.scroll();
    }, 500);
  }

  scroll() {
    let self = this;
    let fromTop = window.scrollY;
    let scrollTopGrid = self.grid.offsetTop;
    let gridOffset = self.grid.offsetHeight - scrollTopGrid;
    self.newDelta = Math.abs(gridOffset - fromTop);

    if (self.newDelta > self.delta){
      self.repose = true;
    } else {
      self.repose = false;
    }

    self.delta = self.newDelta;
    if(!self.repose) {
      if(self.newDelta < 800){

        if(self.cola > self.oldCola){
          self.oldCola = self.cola;
          self.props.fetch(function(){
            self.cola = self.cola + 1;
          })
        }
      }
    }
  }
}

export default QuotesList;
