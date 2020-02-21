import React, { ChangeEvent, Component } from 'react';
import { INPUT_TYPE, InputComponent } from '../common/Input';
import { Expression } from '../../interface';

import './Screen.scss';
import { classNames } from '../../utils';

export interface ScreenComponentProps {
  expression: Expression;
  result?: string;
  resultAsExpression?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onExpandExpression?: () => void;
}

export class ScreenComponent extends Component<ScreenComponentProps> {
  public onClickExpandExpression = this.expandExpression.bind(this);

  public get isExpandable() {
    const { result, resultAsExpression } = this.props;
    return resultAsExpression && result;
  }

  public expandExpression() {
    if (this.isExpandable && this.props.onExpandExpression) {
      this.props.onExpandExpression();
    }
  }

  render() {
    const { expression, result, onChange, resultAsExpression } = this.props;
    let resultDisplay;
    if (expression && result) {
      resultDisplay =
        <div className="screen-component-result">
          <div className={ classNames([ `screen-component-result--expression`, { expand: this.isExpandable } ]) }
               onClick={ this.onClickExpandExpression }>
            { expression }
          </div>
          <div className="screen-component-result--result">
            <span>=</span>
            { result }
          </div>
        </div>;
    } else {
      resultDisplay = <div className="screen-component-result"/>;
    }

    return (
      <div className="screen-component">
        { resultDisplay }
        <InputComponent type={ INPUT_TYPE.TEXT } value={ resultAsExpression && result ? result.toString() : expression } placeholder="0"
                        onChange={ onChange } autoFocus={ true }/>
      </div>
    );
  }
}
