import { TOGGLE_EVENT } from '../actions/ui'

const rerenderReducer = (state=true, action) => {
  switch (action.type) {
    case TOGGLE_EVENT:
      return false;
    default:
      return true;
  };
};

export default rerenderReducer;
