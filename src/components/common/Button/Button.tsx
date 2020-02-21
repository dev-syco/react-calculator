import React, { Component, MouseEvent } from 'react';

import './Button.scss';

export interface ButtonComponentProps {
  label?: string | number;
  onClick?: (e: MouseEvent) => void;
}

export class ButtonComponent extends Component<ButtonComponentProps> {
  render() {
    return (
      <button onClick={ this.props.onClick }>{ this.props.label }</button>
    );
  }
}
