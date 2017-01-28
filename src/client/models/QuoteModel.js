import {observable} from 'mobx';

export default class QuoteModel {
  store;
  id;
  slug
  author;
  content;
  // @observable foo;
  // @observable bar;

  constructor(store, id, slug,content, author) {
    this.store = store;
    this.id = id;
    this.slug = slug
    this.content = content
    this.author = author || {}
  }

  static fromJS(store, object) {
    return new QuoteModel(store, object._id, object.slug, object.content, object.author);
  }
}
