import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import MiniCal from './smallCal';
import { format } from '../utils/date';




class Time extends React.Component{
  constructor(props){
    super(props);
    this.state={};
  }

  minute(){
    const m = this.props.date.getMinutes();
    if (m < 10) return '0' + m;
    return m;
  }

  hour(){
    const h = (this.props.date.getHours() - 1) % 12 + 1;
    if (h < 10) return '0' + h;
    return h;
  }

  suffix(){
    const h = this.props.date.getHours();
    return ( h >= 12 ? 'pm' : 'am' )
  }

  setHours(e){
    const current = +e.currentTarget.value;
    const h = this.props.date.getHours();
    const date = new Date(this.props.date.valueOf());

    if (current > 1){e.currentTarget.nextElementSibling.select();}
    if (Number.isNaN(current) || current > 12) return;

    const newhours = current % 12 + (h >= 12 ? 12 : 0);
    date.setHours(newhours);
    this.props.set(date);
  }

  setMins(e){
    const current = +e.currentTarget.value;
    const date = new Date(this.props.date.valueOf());

    if (current > 5){e.currentTarget.nextElementSibling.select();}
    if (Number.isNaN(current) || current > 60) return;
    date.setMinutes(current);
    this.props.set(date);
  }

  setSuffix(e){
    const h = this.props.date.getHours();
    const current = e.currentTarget.value;
    const date = new Date(this.props.date.valueOf());

    if (current === 'p' && h < 12){
      date.setHours(h + 12);
      this.props.set(date);
    }

    if (current === 'a' && h >= 12){
      date.setHours(h - 12);
      this.props.set(date);
    }

    e.currentTarget.blur();
  }




  render(){
    return (
      <div style={{display:'inline-block'}}>
        <input
          size='2'
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setHours(e)}
          value={this.hour()}/>:
        <input
          size='2'
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setMins(e)}
          value={this.minute()}/>
        <input
          size='2'
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setSuffix(e)}
          value={this.suffix()}/>
      </div>
    );
  }
}




class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: this.props.date,
      end: this.props.date,
      activeCal: null,
    }
    this.set = this.set.bind(this)
  }

  set(attr){
    return val => this.setState({
      [attr]: val,
      activeCal: null
    })
  }

  toggleCal(cal){
    this.state.activeCal === cal ?
    this.setState({activeCal: null}) :
    this.setState({activeCal: cal})
  }

  dateSetter(attr){
    return(
      <div className='date-selector' onClick={()=>this.toggleCal(attr)}>
          <i className="far fa-calendar-alt"/>
          &nbsp; {format(this.state[attr])}
          {this.state.activeCal === attr ?
            <MiniCal date={this.state[attr]} set={this.set(attr)}/> :null}
      </div>
    )
  }

  render(){
    return(
      <div>
        <div className='screen' onClick={this.props.toggle}/>
        <form>
          <i className="close fas fa-times-circle"
             onClick={this.props.toggle}></i>
           <div>
             <div>Start:</div>
             {this.dateSetter('start')}
             &nbsp;at&nbsp;
             <Time
               date={this.state.start}
               set={this.set('start')}/>
           </div>

           <div>
             <div>End:</div>
             {this.dateSetter('end')}
             &nbsp;at&nbsp;
             <Time
               date={this.state.end}
               set={this.set('end')}/>
           </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    on: state.ui.eventForm
  };
};

const mapDispatch = dispatch => {
  console.log(toggleModal);
  return {
    toggle: () => dispatch(toggleModal())
  };
};



export default connect(mapState, mapDispatch)(Form);
