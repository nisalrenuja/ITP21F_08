/* global describe, test, document, expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import MissionVision from './MissionVision';

describe('AboutUsModule - MissionVission.jsx', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MissionVision />, div);
  });

  test('render with correct title', () => {
    const titleText = 'Our Mission';
    render(<MissionVision />);
    expect(screen.queryByText(titleText)).toBeInTheDocument();
  });
});
