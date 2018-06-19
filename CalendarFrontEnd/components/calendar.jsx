import React from 'react'


Date.prototype.endOfMonth = function(){
  let date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
}

Date.prototype.firstWeekday = function(){
  let date = new Date(this.valueOf());
  date.setDate(1);
  return date.getDay();
}

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

const months = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'July',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}


export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      displayDate: new Date(),
    };
  }

  renderMonth(firstWeekday, endOfMonth){
    const cal = []
    const end = (7 - (endOfMonth+firstWeekday) % 7) % 7;

    let i, j, k;
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='day null'/>);
    for (j=0; j<endOfMonth; j++) cal.push(<div key={i+j} className='day'><p>{j+1}</p></div>);
    for (k=0; k<end; k++) cal.push(<div key={i+j+k} className='day null'/>);

    return cal;
  }

  changeMonth(inc){
    const displayDate = new Date(this.state.displayDate.valueOf());
    displayDate.setMonth(displayDate.getMonth() + inc);
    this.setState({ displayDate })
  }

  render(){
    const firstWeekday = this.state.displayDate.firstWeekday();
    const endOfMonth = this.state.displayDate.endOfMonth();
    const month = months[this.state.displayDate.getMonth()];
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
      {this.renderMonth(firstWeekday, endOfMonth)}

    </div>
    )
  }
}
