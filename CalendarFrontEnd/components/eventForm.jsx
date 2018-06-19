import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import MiniCal from './smallCal';
import { format } from '../utils/date';




class Time extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hour: 12,
      minute: 0,
      suffix: 'am'
    }
  }

  format(val){
    if (val < 10) return '0' + val;
    return val;
  }

  setMins(e){
    const current = +e.currentTarget.value;
    if (Number.isNaN(current) || current > 60) return;
    this.setState({minute: current});
  }

  setHours(e){
    const current = +e.currentTarget.value;
    if (Number.isNaN(current) || current > 12) return;
    this.setState({hour: current});
  }


  render(){
    return (
      <div>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setHours(e)}
          value={this.format(this.state.hour)}/>:
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setMins(e)}
          value={this.format(this.state.minute)}/>
        <input
          onClick={e => e.currentTarget.select()}
          onChange={e=>this.setState({suffix: e.currentTarget.value})}
          value={this.state.suffix}/>
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
             <Time/>
           </div>

           <div>
             <div>End:</div>
             {this.dateSetter('end')}
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
