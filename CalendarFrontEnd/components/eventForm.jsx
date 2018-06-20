import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import MiniCal from './smallCal';
import { format } from '../utils/date';
import Time from './time';


class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      start: this.props.date,
      end: this.props.date,
      title: '',
      location: '',
      description: '',
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
      <div className='date-bar'>
        <div className='date-title'>{attr}:</div>

        <div className='date-selector' onClick={()=>this.toggleCal(attr)}>
          <i className="far fa-calendar-alt"/>
          &nbsp; {format(this.state[attr])}
          {this.state.activeCal === attr ?
            <MiniCal date={this.state[attr]} set={this.set(attr)}/> :null}
        </div>

        &nbsp;at&nbsp;

        <Time
          date={this.state[attr]}
          set={this.set(attr)}/>
    </div>
    )
  }

  update(field){
    return e => this.setState({[field]: e.target.value})
  }

  render(){
    return(
      <div>
        <div className='screen' onClick={this.props.toggle}/>
        <form>
          <i className="close fas fa-times-circle"
             onClick={this.props.toggle}></i>
          <h1>Create Event</h1>

             {this.dateSetter('start')}
             {this.dateSetter('end')}

             <div style={{margin:'10px',width:'100%'}}>
               <div className='date-bar'>
                 <div>Title:</div>
                 <input
                   value={this.state.title}
                   onChange={this.update('title')}
                   style={{width: '100%'}}/>
               </div>

               <div className='date-bar'>
                 <div>Location:</div>
                 <input
                   value={this.state.location}
                   onChange={this.update('location')}
                   style={{width: '100%'}}/>
               </div>
             </div>

             <div className='date-bar description'>
               <div className='date-title'>Description:</div>
               <textarea/>
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
