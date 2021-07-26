/* global describe, test, document, expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import WhatMsClub from './WhatMsClub';

describe('AboutUsModule - WhatMsClub.jsx', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WhatMsClub />, div);
  });

  test('render with correct title', () => {
    const titleText = 'What is MS Club of SLIIT ?';
    render(<WhatMsClub />);
    expect(screen.queryByText(titleText)).toBeInTheDocument();
  });
});
