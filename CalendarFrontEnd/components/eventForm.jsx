import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';
import MiniCal from './smallCal';
import { format } from '../utils/date';

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
      <div className='date-selector'>
        <div
          style={{cursor: 'pointer'}}
          onClick={()=>this.toggleCal(attr)}>
          <i className="far fa-calendar-alt"/>
          &nbsp; {format(this.state[attr])}
          {this.state.activeCal === attr ?
            <MiniCal date={this.state[attr]} set={this.set(attr)}/> :null}
        </div>
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
             Start:
             {this.dateSetter('start')}
           </div>

           <div>
             End:
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
