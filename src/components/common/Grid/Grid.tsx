import React, { Component, ReactNode } from 'react';
import nanoid from 'nanoid';
import { GridCellComponent, GridCellComponentProps } from './GridCell/GridCell';

import './Grid.scss';

export interface GridComponentProps {
  cols: number;
}

export class GridComponent extends Component<GridComponentProps> {
  public get gridCells() {
    const { cols } = this.props;
    if (this.props.children instanceof Array) {
      return this.props.children.map((cell: any) => {
        const { colspan } = cell.props;
        return this.wrapWithCellComponent(cell, { size: (colspan || 1) / cols, ...cell.props });
      });
    } else {
      return this.wrapWithCellComponent(this.props.children, { size: 1 });
    }
  }

  public wrapWithCellComponent(data: ReactNode, props: GridCellComponentProps = {}) {
    return <GridCellComponent key={ nanoid() } { ...props }>{ data }</GridCellComponent>;
  }

  render() {
    return (
      <div className="grid-component">
        { this.gridCells }
      </div>
    );
  }
}
