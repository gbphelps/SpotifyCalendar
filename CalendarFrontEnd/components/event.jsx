import * as Cal from '../utils/date';
import React from 'react';
import { connect } from 'react-redux';
import { toggleEvent, toggleEditor } from '../actions/ui'

const Event = (props) => {
  if (props.event.spacer) return <li className='event spacer' style={{width:'0px', background:'transparent'}}/>;

  const start = new Date(props.event.start);
  const end = new Date(props.event.end);
  const diff = Cal.numDays(start, end);

  const mouseover = e => {
      const maxX = window.innerWidth - 330;
      const x = e.clientX + 20;
      const y = e.target.getBoundingClientRect().bottom + 10;

      window.show = setTimeout(()=>{
        props.toggleEvent(
          props.event.id,
          x > maxX ? maxX : x,
          y);
      }, 300)
  }

  const mouseout = () => {
    clearInterval(window.show);
    props.toggleEvent();
  }

  //TODO TODO is there a way to factor out the 151 (width of a square)
  //and the 2 (leftmargin + rightmargin)??
  //would be nice to hook this up explicitly to the CSS stylesheet.
  return (
    <li className='event'
        style={{width: props.event.length*151 - 2, zIndex: props.event.depth + 1}}
        onMouseOver={e => mouseover(e)}
        onMouseOut={mouseout}
        onClick={e=>{
          e.stopPropagation();
          props.toggleEditor(props.event);
        }}>
      {props.event.title}
    </li>
  )
}

const mapDispatch = dispatch => {
  return {
    toggleEvent: (id, x, y) => dispatch(toggleEvent(id, x, y)),
    toggleEditor: event => dispatch(toggleEditor(event))
  }
}

export default connect(null,mapDispatch)(Event)
