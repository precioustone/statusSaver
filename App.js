import React, { Component } from 'react';
import AppNavigator from './navigation';
import { createAppContainer } from 'react-navigation';
import {Provider } from 'react-redux';

import store from './redux/store';


const Navigation = createAppContainer(AppNavigator);

const App = _ => (
  <Provider store={store}>
    <Navigation />
  </Provider>
)

export default App;
