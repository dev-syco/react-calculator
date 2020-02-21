import React, { Component } from 'react';

import './GridCell.scss';

export interface GridCellComponentProps {
  size?: number;
  colspan?: number;
  className?: string[] | string;
}

export class GridCellComponent extends Component<GridCellComponentProps> {
  get classNames() {
    const { className } = this.props;
    let classNames = [ 'grid-cell-component' ];

    if (className instanceof Array) {
      classNames = classNames.concat(className);
    } else if (className) {
      classNames.push(className);
    }
    return classNames.join(' ');
  }

  get styles() {
    const { size } = this.props;
    return {
      flexBasis: size ? `${ 100 * size }%` : '',
    };
  }

  render() {
    return (
      <div className={ this.classNames } style={ this.styles }>
        { this.props.children }
      </div>
    );
  }
}
