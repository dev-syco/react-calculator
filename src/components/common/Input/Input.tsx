import React, { ChangeEvent, Component, KeyboardEvent } from 'react';

import './Input.scss';

export enum INPUT_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
}

export interface InputComponentProps {
  type: INPUT_TYPE;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class InputComponent extends Component<InputComponentProps> {
  render() {
    return (
      <input { ...this.props }/>
    );
  }
}
