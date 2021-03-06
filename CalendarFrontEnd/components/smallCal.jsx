import React from 'react';
import * as Cal from '../utils/date'



const dayHeaders = (
  <div>
    <div className='mini null'>S</div>
    <div className='mini null'>M</div>
    <div className='mini null'>T</div>
    <div className='mini null'>W</div>
    <div className='mini null'>T</div>
    <div className='mini null'>F</div>
    <div className='mini null'>S</div>
  </div>
);


export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayDate: this.props.date,
    };
  }

  renderMonth(){
    const firstWeekday = Cal.firstWeekday(this.state.displayDate);
    const endOfMonth = Cal.endOfMonth(this.state.displayDate);
    const cal = []
    const end = (7 - (endOfMonth+firstWeekday) % 7) % 7;

    let i, j, k;
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='mini null'/>);
    for (j=0; j<endOfMonth; j++){
      const date = new Date(this.state.displayDate.valueOf());
      date.setDate(j+1);
      const selected = date.valueOf() === this.props.date.valueOf();
      cal.push(
      <div
        key={i+j}
        className={`mini ${selected ? 'selected' : ''}`}
        onClick={()=>this.props.set(date)}>
          {j+1}
      </div>
      )
    };
    for (k=0; k<end; k++) cal.push(<div key={i+j+k} className='mini null'/>);
    cal.push(<div key='clear' style={{content:'', clear:'both'}}/>);
    return cal;
  }

  changeMonth(inc){
    const displayDate = new Date(this.state.displayDate.valueOf());
    displayDate.setMonth(displayDate.getMonth() + inc);
    this.setState({ displayDate })
  }

  render(){
    const month = Cal.months[this.state.displayDate.getMonth()];
    const year = this.state.displayDate.getFullYear();

    return(
    <div className='mini-cal'>

      <div className='mini-month'>
        <i
          className='fas fa-chevron-circle-left'
          onClick={e => {e.stopPropagation(); this.changeMonth(-1)}} />
          &nbsp;
          <div
            style={{
              display:'inline-block',
              width:'90px'}}>
                {month} {year}
          </div>
          &nbsp;
        <i
          className='fas fa-chevron-circle-right'
          onClick={e => {e.stopPropagation(); this.changeMonth(1)}} />

      </div>

      {dayHeaders}
      {this.renderMonth()}
    </div>
    )
  }
}
