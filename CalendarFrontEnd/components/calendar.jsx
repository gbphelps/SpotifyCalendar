import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import Form from './eventForm';
import * as Cal from '../utils/date';
import { fetchMonth } from '../actions/events';
import values from 'lodash/values'



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

  handleClick(i){
    console.log(i);
      this.props.toggleModal();
      const selectedDate = new Date(this.state.displayDate.valueOf());
      selectedDate.setDate(i);
      this.setState({ selectedDate });
  }

  dayRanges(){
    const seed = this.state.displayDate.valueOf();
    let start = new Date(seed);
    start.setDate(1);
    start.setHours(0,0,0,0);
    const end = new Date(start.valueOf());
    end.setMonth(start.getMonth()+1);

    let ranges = [];
    while (start.valueOf() < end.valueOf()) {
      const next = new Date(start.valueOf());
      next.setDate(next.getDate() + 1);
      ranges.push([start.valueOf(), next.valueOf()]);
      start = next;
    }

    const dayHash = {};
    this.props.events.forEach(event=>{
      for (let i = 0; i < ranges.length; i++) {
        console.log(event.start, ranges[i][0], ranges[i][1]);
        if (event.start >= ranges[i][0] &&
            event.start < ranges[i][1]){
              dayHash[i+1] = dayHash[i+1] ? dayHash[i+1].concat(event) : [event];
              return;
            }
      }
    })

    return dayHash;
    //so you can map through ranges now!
    //will actually want to do reverse: iterate thru state,
    //add to each range bucket.
  }

  monthRange(){
      const seed = this.state.displayDate.valueOf();
      let start = new Date(seed);
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

    let i, j, k;
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='day null'/>);
    for (j=0; j<endOfMonth; j++){
      const day = j + 1;
      cal.push(
        <div
          key={i+j}
          className='day'
          onClick={()=>this.handleClick(day)}>
            <p>{day}</p>
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
    console.log(this.dayRanges());
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
      {this.props.eventForm ? <Form date={this.state.selectedDate}/> : null}
    </div>
    )
  }
}

const mapState = state => {
  return {
    eventForm: state.ui.eventForm,
    events: values(state.events)
  }
}

const mapDispatch = dispatch => {
  return {
    toggleModal: () => dispatch(toggleModal()),
    fetchMonth: range => dispatch(fetchMonth(range))
  }
}

export default connect(mapState,mapDispatch)(Calendar)
