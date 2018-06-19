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
    }
    this.set = this.set.bind(this)
  }

  set(attr){
    return val => this.setState({[attr]: val})
  }

  render(){
    return(
      <div>
        <div className='screen' onClick={this.props.toggle}/>
        <form>
          <i className="close fas fa-times-circle"
             onClick={this.props.toggle}></i>
           <div>{format(this.state.start)}</div>
           <MiniCal date={this.state.start} set={this.set('start')}/>
           <div>{format(this.state.end)}</div>
           <MiniCal date={this.state.end} set={this.set('end')}/>
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
