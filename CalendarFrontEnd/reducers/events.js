import { RECEIVE_EVENTS, RECEIVE_EVENT, REMOVE_EVENT } from '../actions/events';
import merge from 'lodash/merge'

const eventReducer = (state={}, action) => {
  switch (action.type){
    case RECEIVE_EVENT:
      return merge({}, state, {[action.event.id]: action.event});
    case REMOVE_EVENT:
      const prev = merge({},state);
      delete prev[action.id];
      return prev;
    case RECEIVE_EVENTS:
      return action.events;
    default:
      return state;
  }
}

export default eventReducer;
