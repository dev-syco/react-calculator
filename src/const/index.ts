export enum CALCULATOR_BUTTON {
  CLEAN = 'C',
  BRACKETS = '()',
  PERCENT = '%',
  POW = '^',
  RADICAL = '√',
  PLUS = '+',
  MINUS = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
  EQUAL = '=',
  FLOAT = ',',
  ZERO = '0',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
}

export enum BRACKETS {
  OPEN = '(',
  CLOSE = ')'
}

export const OPERATOR_TOKENS = [
  '/', '÷', '*', '×', 'x', 'x', 'X', '=', '-', '−', '+', '^', '√',
];

export const ALLOWED_TOKENS = [
  ...OPERATOR_TOKENS,
  '%', '.', ',', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')',
];

export enum CALCULATOR_ERROR {
  UNCLOSED_PARENTHESES = 'Unclosed parentheses'
}
