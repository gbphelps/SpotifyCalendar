import { combineReducers } from 'redux';
import events from './events';
import ui from './ui';

export default combineReducers({ events, ui })
