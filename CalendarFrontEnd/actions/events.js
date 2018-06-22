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

export const REMOVE_EVENT = 'REMOVE_EVENT';
export const removeEvent = id => {
  return {
    type: REMOVE_EVENT,
    id
  }
}

export const createEvent = event => dispatch => {
  return Api.createEvent(event)
  .fail(()=>{})//TODO display errors
  .then(event=>dispatch(receiveEvent(event)))
}

export const updateEvent = event => dispatch => {
  return Api.updateEvent(event)
  .then(event=>dispatch(receiveEvent(event)))
}

export const deleteEvent = id => dispatch => {
  return Api.deleteEvent(id)
  .then(()=> dispatch(removeEvent(id)))
}
