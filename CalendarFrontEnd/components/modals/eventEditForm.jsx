import Form from './eventForm';
import { toggleEditor } from '../../actions/ui';
import { updateEvent } from '../../actions/events';
import { connect } from 'react-redux'

const mapState = state => {
  if (!state.ui.editForm) return {};
  return Object.assign({},state.ui.editForm,{
    on:true,
    start: new Date(state.ui.editForm.start),
    end: new Date(state.ui.editForm.end),
  });
};

const mapDispatch = (dispatch) => {
  return {
    toggle: () => dispatch(toggleEditor()),
    createOrUpdate: event => dispatch(updateEvent(event))
  };
};

export default connect(mapState,mapDispatch)(Form);


//TODO still need to finish integration
