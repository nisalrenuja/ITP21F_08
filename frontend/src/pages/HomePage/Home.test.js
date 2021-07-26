/* global describe, test, document */
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

describe('Home Page', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home />, div);
  });
});
