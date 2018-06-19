import React from 'react';
import * as Cal from '../utils/date'



const dayHeaders = (
  <div>
    <div className='mini'>S</div>
    <div className='mini'>M</div>
    <div className='mini'>T</div>
    <div className='mini'>W</div>
    <div className='mini'>T</div>
    <div className='mini'>F</div>
    <div className='mini'>S</div>
  </div>
);


export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    console.log(this.props.date);
    this.state = {
      date: this.props.date,
      displayDate: this.props.date,
    };
  }

  renderMonth(){
    const firstWeekday = Cal.firstWeekday(this.state.displayDate);
    const endOfMonth = Cal.endOfMonth(this.state.displayDate);
    const cal = []
    const end = (7 - (endOfMonth+firstWeekday) % 7) % 7;

    let i, j, k;
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='mini'/>);
    for (j=0; j<endOfMonth; j++){
      const date = new Date(this.state.displayDate.valueOf());
      date.setDate(j+1);
      const selected = date.valueOf() === this.state.date.valueOf();
      cal.push(
      <div
        key={i+j}
        className={`mini ${selected ? 'selected' : ''}`}
        onClick={()=>this.setState({ date })}>
          {j+1}
      </div>
      )
    };
    for (k=0; k<end; k++) cal.push(<div key={i+j+k} className='mini'/>);
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
          onClick={() => this.changeMonth(-1)} />
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
          onClick={() => this.changeMonth(1)} />

      </div>

      {dayHeaders}
      {this.renderMonth()}
    </div>
    )
  }
}
