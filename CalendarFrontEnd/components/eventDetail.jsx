import React from 'react';
import { connect } from 'react-redux';
import * as Cal from '../utils/date'

const EventDetail = ({event, x, y}) => {
  if (!event) return null;
  const start = new Date(event.start);
  const end = new Date(event.end);
  return(
    <div className='event-detail' style={{
        position:'fixed',
        top: y,
        left: x,
        zIndex: 100,
      }}>
       <div className='event-detail-title'>{event.title}</div>
       <div className= 'event-detail-body'>
         <div>From {Cal.format(start)} at {Cal.time(start)}</div>
         <div>To {Cal.format(end)} at {Cal.time(end)}</div>
         <div>Location: {event.location}</div>
         <div>Description: {event.description}</div>
       </div>
    </div>
  )
}

const mapState = state => {
  if (!state.ui.activeEvent) return {};
  return {
    event: state.events[state.ui.activeEvent.id],
    x: state.ui.activeEvent.x,
    y: state.ui.activeEvent.y
  };
};

export default connect(mapState)(EventDetail);
