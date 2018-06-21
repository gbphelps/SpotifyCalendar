import { TOGGLE_MODAL, TOGGLE_EVENT } from '../actions/ui'

const uiReducer = (state = {eventForm: false, activeEvent: null}, action) => {
  console.log(action);
  switch (action.type) {
    case TOGGLE_MODAL:
      return {eventForm: !state.eventForm}
    case TOGGLE_EVENT:
      return {activeEvent: action.payload}
    default:
      return state;
  }
}

export default uiReducer
