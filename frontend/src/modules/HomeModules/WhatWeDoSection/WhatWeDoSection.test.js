/* global describe, test, document, expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import WhatWeDoSection from './WhatWeDoSection';

describe('HomeModule - WhatWeDoSection.jsx', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WhatWeDoSection />, div);
  });

  test('render with correct title', () => {
    const titleText = 'What We Do';
    render(<WhatWeDoSection />);
    expect(screen.queryByText(titleText)).toBeInTheDocument();
  });
});
