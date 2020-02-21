import React from 'react';
import { render } from '@testing-library/react';
import { CalculatorComponent } from './Calculator';

test('Calculator screen exist', () => {
  const { container } = render(<CalculatorComponent/>);
  expect(container.getElementsByClassName('screen-component').length).toBe(1);
});

test('Calculator keyboard exist', () => {
  const { container } = render(<CalculatorComponent/>);
  expect(container.getElementsByClassName('keyboard-component').length).toBe(1);
});
