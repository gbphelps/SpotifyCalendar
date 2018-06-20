import * as Api from '../utils/events'

export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

export const receiveEvents = events => {
  return {
    type: RECEIVE_EVENTS,
    events
  };
};

export const fetchMonth = range => dispatch => {
  return Api.getMonth(range)
  .then(events=>dispatch(receiveEvents(events)))
}

export const RECEIVE_EVENT = 'RECEIVE_EVENT';
export const receiveEvent = event => {
  return {
    type: RECEIVE_EVENT,
    event
  };
};

export const createEvent = event => dispatch => {
  return Api.createEvent(event)
  .then(event=>dispatch(receiveEvent(event)))
}
