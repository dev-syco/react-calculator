import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

const { container } = render(<App/>);

test('Calculator component exist', () => {
  expect(container.getElementsByClassName('calculator-component').length).toBe(1);
});
