/* global describe, test, document */
import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';

describe('Footer', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
  });
});
