import AppStore from './AppStore'
import UserStore from './UserStore'
import AuthStore from './AuthStore'
import QuoteStore from './QuoteStore'
import AuthorStore from './AuthorStore'


function createStores(state){
  return {
    authStore: new AuthStore(state.auth),
    appStore: AppStore.fromJS(state.app),
    userStore: UserStore.fromJS(state.user),
    quoteStore: QuoteStore.fromJS(state.quote),
    authorStore: AuthorStore.fromJS(state.author)
  };
}

export default createStores;
