import React, { ChangeEvent, Component } from 'react';
import { debounce } from 'lodash';
import { ScreenComponent } from '../Screen';
import { KeyboardButton, KeyboardComponent } from '../Keyboard';
import { QuickMath } from '@dev-syco/quick-math';
import {
  expressionReadyForCalculation,
  fulFillBracket,
  isStringSafe,
  replaceCommaToPoint,
  replaceExpressionSpaces,
  replacePointToComma,
  transformBigNumberToPow,
} from '../../utils';
import { ALLOWED_TOKENS, BRACKETS, CALCULATOR_BUTTON, CALCULATOR_ERROR } from '../../const';
import { Expression } from '../../interface';

import './Calculator.scss';

export interface CalculatorComponentProps {
}

export interface CalculatorComponentState {
  expression: Expression;
  result?: string;
  resultAsNewExpression?: boolean;
}

export class CalculatorComponent extends Component<CalculatorComponentProps, CalculatorComponentState> {
  public keyboardButtons: Map<CALCULATOR_BUTTON, KeyboardButton> = new Map()
    .set(CALCULATOR_BUTTON.CLEAN, { onClick: () => this.cleanExpression(), className: 'light-blue' })
    .set(CALCULATOR_BUTTON.BRACKETS, { onClick: () => this.addBrackets(), className: 'light-blue' })
    .set(CALCULATOR_BUTTON.PERCENT, { className: 'light-blue' })
    .set(CALCULATOR_BUTTON.DIVIDE, { className: 'blue' })
    .set(CALCULATOR_BUTTON.SEVEN, {})
    .set(CALCULATOR_BUTTON.EIGHT, {})
    .set(CALCULATOR_BUTTON.NINE, {})
    .set(CALCULATOR_BUTTON.MULTIPLY, { className: 'blue' })
    .set(CALCULATOR_BUTTON.FOUR, {})
    .set(CALCULATOR_BUTTON.FIVE, {})
    .set(CALCULATOR_BUTTON.SIX, {})
    .set(CALCULATOR_BUTTON.MINUS, { className: 'blue' })
    .set(CALCULATOR_BUTTON.ONE, {})
    .set(CALCULATOR_BUTTON.TWO, {})
    .set(CALCULATOR_BUTTON.THREE, {})
    .set(CALCULATOR_BUTTON.PLUS, { className: 'blue' })
    .set(CALCULATOR_BUTTON.ZERO, { colspan: 2 })
    .set(CALCULATOR_BUTTON.FLOAT, {})
    .set(CALCULATOR_BUTTON.EQUAL, { onClick: () => this.calculateExpression(true), className: 'green' });
  public computedButtonsCache: KeyboardButton[] = [];
  public calculateDebounced = debounce(() => this.calculateExpression(), 250);
  public onScreenInput = this.handleScreenInput.bind(this);
  public onExpandExpression = this.resetResultAsExpression.bind(this);

  constructor(props: CalculatorComponentProps) {
    super(props);
    this.state = {
      expression: '',
      result: undefined,
      resultAsNewExpression: false,
    };
  }

  public componentDidUpdate(prevProps: Readonly<CalculatorComponentProps>, prevState: Readonly<CalculatorComponentState>): void {
    if (this.state.expression !== prevState.expression) {
      this.calculateDebounced();
    }
  }

  public get calculatorKeyboardButtonsAsArray() {
    for (let [ label, props ] of this.keyboardButtons.entries()) {
      const button = { label, ...props, onClick: props.onClick || this.onButtonClickDefault(label) };
      const existing = this.computedButtonsCache.filter(i => i.label === button.label);
      if (!existing.length) {
        this.computedButtonsCache.push(button);
      }
    }
    return this.computedButtonsCache;
  }

  public handleScreenInput(event: ChangeEvent<HTMLInputElement>) {
    const expression = replaceExpressionSpaces(event.currentTarget && event.currentTarget.value);
    const nativeEvent = event.nativeEvent as InputEvent;
    const button = nativeEvent.data && nativeEvent.data.trim();

    if (button === CALCULATOR_BUTTON.EQUAL) {
      return this.calculateExpression(true);
    }

    if (isStringSafe(expression, ALLOWED_TOKENS)) {
      this.setState({ expression: replacePointToComma(expression), resultAsNewExpression: false });
    }
  }

  public onButtonClickDefault(value: string) {
    return () => {
      this.addToExpression(value);
    };
  }

  public addToExpression(value: string) {
    return this.setState(state => {
      const { resultAsNewExpression, expression, result } = state;
      return {
        expression: (resultAsNewExpression ? result : expression) + value,
      };
    });
  }

  public cleanExpression() {
    this.setState({ expression: '', result: undefined });
  }

  public resetResultAsExpression() {
    this.setState({ resultAsNewExpression: false });
  }

  public addBrackets() {
    const { expression } = this.state;
    this.addToExpression(fulFillBracket(expression, { open: BRACKETS.OPEN, close: BRACKETS.CLOSE }));
  }

  public calculateExpression(resultAsNewExpression: boolean = false) {
    let result = undefined;
    if (expressionReadyForCalculation(this.state.expression)) {
      result = replacePointToComma(this.getCalculated());
    }
    if (result === 'NaN') {
      result = undefined;
    }
    this.setState({ result, resultAsNewExpression });
  }

  private getCalculated(): string {
    try {
      const expression = replaceCommaToPoint(this.state.expression);
      return transformBigNumberToPow(QuickMath.calculate(expression));
    } catch (e) {
      if (e.message !== CALCULATOR_ERROR.UNCLOSED_PARENTHESES) {
        console.error(e.message);
        return 'Error';
      } else {
        return '';
      }
    }
  }

  render() {
    return (
      <div className="calculator-component">
        <ScreenComponent expression={ this.state.expression }
                         resultAsExpression={ this.state.resultAsNewExpression }
                         result={ this.state.result }
                         onChange={ this.onScreenInput }
                         onExpandExpression={ this.onExpandExpression }/>
        <KeyboardComponent keyboardButtonsProps={ this.calculatorKeyboardButtonsAsArray }/>
      </div>
    );
  }
}
