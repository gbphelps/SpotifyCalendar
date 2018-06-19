import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import Calendar from './calendar';

export const Root = ({ store }) => {
  return (
    <Provider store = {store}>
      <HashRouter>
        <Calendar/>
      </HashRouter>
    </Provider>
  );
};
