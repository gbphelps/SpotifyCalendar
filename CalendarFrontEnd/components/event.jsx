import * as Cal from '../utils/date';
import React from 'react';

export const Event = ({event}) => {

  const start = new Date(event.start);
  const end = new Date(event.end);

  const diff = Cal.numDays(start, end);

  if (event.spacer) return <li className='event'/>;
  
  return (
    <li className='event'>
      {event.title}
      <div className='popup'>
        <div>From {Cal.format(start)} at {Cal.time(start)}</div>
        <div>To {Cal.format(end)} at {Cal.time(end)}</div>
        <div>Event: {event.title}</div>
        <div>Location: {event.location}</div>
        <div>Description: {event.description}</div>
      </div>
    </li>
  )
}
