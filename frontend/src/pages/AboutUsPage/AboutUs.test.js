/* global describe, test, document */
import React from 'react';
import ReactDOM from 'react-dom';
import AboutUs from './AboutUs';

describe('AboutUs Page', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AboutUs />, div);
  });
});
