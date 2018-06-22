import Form from './eventForm';
import { toggleModal } from '../../actions/ui';
import { createEvent } from '../../actions/events';
import { connect } from 'react-redux'

const mapState = state => {
  return {
    on: state.ui.eventForm,
    title: '',
    location: '',
    description: '',
  };
};

const mapDispatch = dispatch => {
  return {
    toggle: () => dispatch(toggleModal()),
    createOrUpdate: event => dispatch(createEvent(event))
  };
};

export default connect(mapState,mapDispatch)(Form);
