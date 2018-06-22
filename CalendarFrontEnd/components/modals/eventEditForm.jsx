import Form from './eventForm';
import { toggleEditor } from '../../actions/ui';
import { createEvent } from '../../actions/events';
import { connect } from 'react-redux'

const mapState = state => {
  return {
    on: state.ui.eventForm
  };
};

const mapDispatch = dispatch => {
  console.log(toggleModal);
  return {
    toggle: () => dispatch(toggleEditor()),
    //no redux stuff for this yet...don't actually need to know note here;
    createOrUpdate: event => dispatch(createEvent(event))
  };
};

export default connect(mapState,mapDispatch)(Form);


//TODO still need to finish integration
