export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};


export const TOGGLE_EVENT = 'TOGGLE_EVENT';
export const toggleEvent = (id, x, y) => {
  return {
    type: TOGGLE_EVENT,
    payload: { id, x, y }
  };
};
