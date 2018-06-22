import { TOGGLE_MODAL, TOGGLE_EVENT, TOGGLE_EDITOR } from '../actions/ui'

const uiReducer = (state = {eventForm: false, activeEvent: undefined, editForm: undefined}, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({},state,{eventForm: !state.eventForm})
    case TOGGLE_EDITOR:
      return Object.assign({},state,{editForm: action.event})
    case TOGGLE_EVENT:
      return Object.assign({},state,{activeEvent: action.payload})
    default:
      return state;
  }
}

export default uiReducer
