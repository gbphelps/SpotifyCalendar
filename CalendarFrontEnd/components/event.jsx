import * as Cal from '../utils/date';
import React from 'react';

export const Event = ({event}) => {

  const start = new Date(event.start);
  const end = new Date(event.end);

  const startDay = new Date(event.start).setHours(0,0,0,0);
  const endDay = new Date(event.end).setHours(0,0,0,0);
  const diff = (endDay.valueOf() - startDay.valueOf()) / 86400000 + 1;

  return (
    <li className='event' style={{width: diff*10}}>
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
