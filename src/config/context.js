import requestCreator from 'core/request'
import Common from '../stores/Common'
import Account from '../stores/Account'
import SetLists from '../stores/SetLists'
import Sets from '../stores/Sets'
import Songs from '../stores/Songs'

export default(state) => {
  const request = requestCreator(state.account.token)
  return {
    state,
    store: {
      common: new Common(request, state),
      account: new Account(request, state),
      setLists: new SetLists(request, state),
      sets: new Sets(request, state),
      songs: new Songs(request, state)
    }
  }
}
