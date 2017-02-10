import {observable} from 'mobx';

export default class QuoteModel {
  store;
  id;
  slug
  author;
  content;
  // @observable foo;
  // @observable bar;

  constructor(store, object) {
    this.store = store;
    this.id = object._id;
    this.slug = object.slug;
    this.content = object.content;
    this.size = object.size;
    this.tags = object.tags
    this.author = object.author || null
  }

  static fromJS(store, object) {
    return new QuoteModel(store, object);
  }
}
