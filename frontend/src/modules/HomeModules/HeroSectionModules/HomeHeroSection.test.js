/* global describe, test, document, expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import HomeHeroSection from './HomeHeroSection';

describe('HomeModule - HomeHeroSection.jsx', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HomeHeroSection />, div);
  });

  test('render with correct title', () => {
    const titleText = 'MS CLUB OF SLIIT';
    render(<HomeHeroSection />);
    expect(screen.queryByText(titleText)).toBeInTheDocument();
  });
});
