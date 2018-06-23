import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';

import CreateForm from './modals/eventCreateForm';
import EditForm from './modals/eventEditForm';

import * as Cal from '../utils/date';
import { fetchMonth } from '../actions/events';
import values from 'lodash/values';
import Event from './event';

import { createEvent, updateEvent, deleteEvent } from '../actions/events'

const dayHeaders = (
  <div>
    <div className='day-header'>SUN</div>
    <div className='day-header'>MON</div>
    <div className='day-header'>TUES</div>
    <div className='day-header'>WED</div>
    <div className='day-header'>THURS</div>
    <div className='day-header'>FRI</div>
    <div className='day-header'>SAT</div>
  </div>
);



class Calendar extends React.Component {
  constructor(props){
    super(props);
    const seed = new Date().setHours(0,0,0,0).valueOf();
    this.state = {
      date: new Date(seed),
      displayDate: new Date(seed),
      selectedDate: new Date(seed),
    };
    this.handleClick = this.handleClick.bind(this);
  }


  componentDidMount(){
    this.props.fetchMonth(this.monthRange());
  }

  shouldComponentUpdate(nextProps){
    return nextProps.rerender
  }

  handleClick(i){
      this.props.toggleModal();
      const selectedDate = new Date(this.state.displayDate.valueOf());
      selectedDate.setDate(i);
      this.setState({ selectedDate });
  }

  dayHash(){
    const dayHash = {};

    for (var i = 0; i < 31; i++) dayHash[i+1] = [];

    this.props.events.forEach(event=>{
      let startDay = new Date(event.start);
      let endDay = new Date(event.end);

      if (event.start < this.monthRange()[0] && event.end >= this.monthRange()[0]){
        startDay = new Date(this.monthRange()[0]) //clip events beginning before month.
      }

      if (event.end >= this.monthRange()[1]){
        endDay = new Date(this.monthRange()[1]);
        endDay.setDate(0); //clip event ending after month.
      }

      if (startDay.getMonth() !== this.state.displayDate.getMonth()) return;
      //prune *edited* events that are still in state but out of range

      const duration = endDay.getDate() - startDay.getDate() + 1;




      let length;
      length = (duration > 7 - startDay.getDay()) ? 7 - startDay.getDay() : duration;
      const eventWithLength = Object.assign({},event,{ length });
      //TODO: if length overflows calendar, clip it

      const day = startDay.getDate();
      let depth = null;

      for (let i = 0; i <= dayHash[day].length; i++) {
        if (!dayHash[day][i]){
          depth = i;
          dayHash[day][i] = Object.assign(eventWithLength,{ depth });
          break;
        }
      }

      for (let i = 1; i < duration; i++) {
        startDay.setDate(startDay.getDate() + 1);
        if (startDay.getMonth() !== this.state.displayDate.getMonth()) break;
        const daysLeft = duration - i;

        if (startDay.getDay() === 0){
          length = daysLeft > 7 ? 7 : daysLeft;
          depth = dayHash[day + i].length;
          const eventWithLength = Object.assign({}, event, { length, depth });
          dayHash[day + i].push(eventWithLength); //TODO push or find lowest depth? I think push is ok.
        }
        else {
          dayHash[day + i][depth] = {spacer: true};
        }
      }
    });
    return dayHash;
  }

  monthRange(){
      let start = new Date(this.state.displayDate.valueOf());
      start.setDate(1);
      start.setHours(0,0,0,0);
      const end = new Date(start.valueOf());
      end.setMonth(start.getMonth()+1);
      return([start.valueOf(), end.valueOf()])
  }


  renderMonth(){
    const firstWeekday = Cal.firstWeekday(this.state.displayDate);
    const endOfMonth = Cal.endOfMonth(this.state.displayDate);
    const cal = []
    const end = (7 - (endOfMonth+firstWeekday) % 7) % 7;
    const dayHash = this.dayHash();

    let i, j, k;
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='day null'/>);

    for (j=0; j<endOfMonth; j++){

      const day = j + 1;
      const events =
        dayHash[day].map((event,idx) => (<Event event={event} key={event.id || `spacer${idx}`}/>));
        //TODO note that you're not explicitly handling undefined entries...it still works though.

      cal.push(
        <div key={i+j} className='day' onClick={()=>this.handleClick(day)}>
          <p>{day}</p>
          <ul>{events}</ul>
        </div>
      );
    }

    for (k=0; k<end; k++) cal.push(<div key={i+j+k} className='day null'/>);

    cal.push(<div key='clear' style={{content:'', clear:'both'}}/>)
    return cal;
  }

  changeMonth(inc){
    const displayDate = new Date(this.state.displayDate.valueOf());
    displayDate.setMonth(displayDate.getMonth() + inc);
    this.setState({ displayDate },()=>{
      this.props.fetchMonth(this.monthRange())
    })
  }

  render(){
    const month = Cal.months[this.state.displayDate.getMonth()];
    const year = this.state.displayDate.getFullYear();

    return(
    <div className='calendar'>

      <div className='month'>
        <i
          className='fas fa-chevron-circle-left'
          onClick={() => this.changeMonth(-1)} />
          &nbsp;
          <div
            style={{
              display:'inline-block',
              width:'300px'}}>
                {month} {year}
          </div>
          &nbsp;
        <i
          className='fas fa-chevron-circle-right'
          onClick={() => this.changeMonth(1)} />

      </div>

      {dayHeaders}
      {this.renderMonth()}

      {this.props.eventForm ?
        <CreateForm
          start={this.state.selectedDate}
          end={this.state.selectedDate}/>
        : null}

      {this.props.editForm ? <EditForm/> : null}
    </div>
    )
  }
}


const mapState = state => {
  return {
    eventForm: state.ui.eventForm,
    editForm: state.ui.editForm,
    events: values(state.events).sort((x,y) => x.start - y.start),
    rerender: state.rerender
  }
}

const mapDispatch = dispatch => {
  return {
    toggleModal: () => dispatch(toggleModal()),
    fetchMonth: range => dispatch(fetchMonth(range)),
  }
}

export default connect(mapState,mapDispatch)(Calendar)
