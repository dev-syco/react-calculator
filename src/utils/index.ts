import { CALCULATOR_BUTTON, OPERATOR_TOKENS } from '../const';

export function fulFillBracket(arr: Array<string> | string, brackets: { open: string, close: string }) {
  const counter = {
    opened: 0,
    closed: 0,
  };

  for (let token of arr) {
    if (token === brackets.open) {
      counter.opened++;
    }
    if (token === brackets.close) {
      counter.closed++;
    }
  }

  return counter.opened === counter.closed ? brackets.open : brackets.close;
}

export function isStringSafe(str: string, allowedSymbols: string[]) {
  let isSafe = true;
  for (let token of str) {
    if (!allowedSymbols.includes(token)) {
      return isSafe = false;
    }
  }

  return isSafe;
}

export function classNames(arr: Array<string | object>) {
  const classNames: string[] = [];

  arr.forEach((i) => {
    if (typeof i === 'object') {
      Object.keys(i).forEach((key) => {
        if ((i as any)[ key ]) {
          classNames.push(key);
        }
      });
    } else {
      classNames.push(i);
    }
  });

  return classNames.join(' ');
}

export function transformBigNumberToPow(num: number) {
  const { [ 0 ]: number, [ 1 ]: pow } = num.toString().split('+');
  return pow ? `${ number }${ CALCULATOR_BUTTON.MULTIPLY }10${ CALCULATOR_BUTTON.POW }${ pow }` : number;
}

export function replacePointToComma(expression: string) {
  return replaceExpressionSpaces(expression).replace(/\./g, ',');
}

export function replaceCommaToPoint(expression: string) {
  return replaceExpressionSpaces(expression).replace(/\,/g, '.');
}

export function replaceExpressionSpaces(expression: string) {
  return expression.replace(/ /g, '');
}

export function expressionReadyForCalculation(expression: string) {
  let isContainOperators = false;

  for (let token of expression) {
    const tokenIndex = expression.indexOf(token);
    if (OPERATOR_TOKENS.includes(token) && tokenIndex + 1 !== expression.length) {
      return isContainOperators = true;
    }
  }
  return isContainOperators;
}
