import AppStore from './app-store';
import UserStore from './user-store';
import AuthStore from './auth-store';
import QuoteStore from './quote-store';
import AuthorStore from './author-store';

function createStores(state) {
  return {
    authStore: new AuthStore(state.auth),
    appStore: AppStore.fromJS(state.app),
    userStore: UserStore.fromJS(state.user),
    quoteStore: QuoteStore.fromJS(state.quote),
    authorStore: AuthorStore.fromJS(state.author)
  };
}

export default createStores;
