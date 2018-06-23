import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Calendar from './calendar';
import EventDetail from './eventDetail';

export const Root = ({ store }) => {
  return (
    <Provider store = {store}>
      <HashRouter>
        <div>
          <Calendar/>
          <EventDetail/>
        </div>
      </HashRouter>
    </Provider>
  );
};
