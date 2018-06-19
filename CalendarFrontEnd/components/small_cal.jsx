import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import Form from './eventForm';
import * as Cal from '../utils/date'



const dayHeaders = (
  <div>
    <div className='mini'>SUN</div>
    <div className='mini'>MON</div>
    <div className='mini'>TUES</div>
    <div className='mini'>WED</div>
    <div className='mini'>THURS</div>
    <div className='mini'>FRI</div>
    <div className='mini'>SAT</div>
  </div>
);


class Calendar extends React.Component {
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
    for (i=0; i<firstWeekday; i++) cal.push(<div key={i} className='mini'/>);
    for (j=0; j<endOfMonth; j++) cal.push(
      <div
        key={i+j}
        className='mini'
        onClick={this.props.toggleModal}>
          <p>{j+1}</p>
        </div>
      )
    ;
    for (k=0; k<end; k++) cal.push(<div key={i+j+k} className='mini'/>);

    return cal;
  }

  changeMonth(inc){
    const displayDate = new Date(this.state.displayDate.valueOf());
    displayDate.setMonth(displayDate.getMonth() + inc);
    this.setState({ displayDate })
  }

  render(){
    const firstWeekday = Cal.firstWeekday(this.state.displayDate);
    const endOfMonth = Cal.endOfMonth(this.state.displayDate);
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
      {this.renderMonth(firstWeekday, endOfMonth)}
      <Form/>
    </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    toggleModal: () => dispatch(toggleModal())
  }
}

export default connect(null,mapDispatch)(Calendar)
