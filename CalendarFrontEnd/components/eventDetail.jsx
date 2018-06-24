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
       <div className='event-detail-title'>{event.title || 'Untitled'}</div>

         <div className='event-detail-dates'>
           <p>From {Cal.format(start)} at {Cal.time(start)}</p>
           <p>To {Cal.format(end)} at {Cal.time(end)}</p>
           {event.location ? <p>Location: {event.location}</p> : null}
         </div>

         {event.description ?
           <div className= 'event-detail-body'>{event.description}</div>
           : null}
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
