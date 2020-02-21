import React, { PureComponent } from 'react';
import { GridComponent } from '../common/Grid';
import { ButtonComponent, ButtonComponentProps } from '../common/Button';
import { GridCellComponentProps } from '../common/Grid/GridCell/GridCell';

import './Keyboard.scss';

export interface KeyboardComponentProps {
  keyboardButtonsProps: KeyboardButton[]
}

export type KeyboardButton = ButtonComponentProps & GridCellComponentProps;

export class KeyboardComponent extends PureComponent<KeyboardComponentProps> {
  public render() {
    return (
      <div className="keyboard-component">
        <GridComponent cols={ 4 }>
          {
            this.props.keyboardButtonsProps.map((props, key) => {
              return <ButtonComponent key={ key } { ...props }/>;
            })
          }
        </GridComponent>
      </div>
    );
  }
}
