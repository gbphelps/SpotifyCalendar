import { TOGGLE_MODAL } from '../actions/ui'

const uiReducer = (state = {eventForm: false}, action) => {
  console.log(action);
  switch (action.type) {
    case TOGGLE_MODAL:
      return {eventForm: !state.eventForm}
    default:
      return state;
  }
}

export default uiReducer
