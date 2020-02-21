import React, { Component } from 'react';
import { CalculatorComponent } from './Calculator';

import './App.scss';

export class App extends Component {
  public render() {
    return (
      <div className="app">
        <main>
          <CalculatorComponent/>
        </main>
      </div>
    );
  }
}
