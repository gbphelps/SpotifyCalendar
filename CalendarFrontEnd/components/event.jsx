import * as Cal from '../utils/date';
import React from 'react';
import { connect } from 'react-redux';
import { toggleEvent } from '../actions/ui'

const Event = (props) => {

  const start = new Date(props.event.start);
  const end = new Date(props.event.end);

  const diff = Cal.numDays(start, end);

  if (props.event.spacer) return <li className='event' style={{width:'0px'}}/>;

  return (
    <li className='event'
        style={{width: props.event.length*101 - 2, background: 'red'}}
        onClick={e=> {
          e.stopPropagation();
          props.toggleEvent(props.event.id, e.clientX, e.clientY);
        }}>
      {props.event.title}
    </li>
  )
}

const mapDispatch = dispatch => {
  return {
    toggleEvent: (id, x, y) => dispatch(toggleEvent(id, x, y))
  }
}

export default connect(null,mapDispatch)(Event)


// <div className='popup'>
//   <div>From {Cal.format(start)} at {Cal.time(start)}</div>
//   <div>To {Cal.format(end)} at {Cal.time(end)}</div>
//   <div>Event: {event.title}</div>
//   <div>Location: {event.location}</div>
//   <div>Description: {event.description}</div>
// </div>
