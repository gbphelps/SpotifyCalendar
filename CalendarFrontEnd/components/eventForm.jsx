import React from 'react';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/ui';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  render(){
    if (!this.props.on) return null;
    return(
      <div>
        <div className='screen' onClick={this.props.toggle}/>
        <form>
          <i className="close fas fa-times-circle"
             onClick={this.props.toggle}></i>
           <input type='date' value={this.state.date} />
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
