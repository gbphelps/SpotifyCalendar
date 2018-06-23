import { combineReducers } from 'redux';
import events from './events';
import ui from './ui';
import rerender from './rerender';

export default combineReducers({ events, ui, rerender })
