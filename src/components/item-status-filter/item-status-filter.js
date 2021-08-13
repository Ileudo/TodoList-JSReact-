import React, { Component } from 'react';
import './item-status-filter.css';

class ItemStatusFilter extends Component {
  constructor() {
    super();

    this.buttons = [
      { filterName: 'all' },
      { filterName: 'active' },
      { filterName: 'done' },
    ];
  }

  render() {
    const { currentFilter, onFilterChange } = this.props;

    const buttonsHTML = this.buttons.map(({ filterName }) => {
      const isActive = currentFilter === filterName;
      const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
          type="button"
          className={`btn ${clazz}`}
          key={filterName}
          onClick={() => onFilterChange(filterName)}
        >
          {filterName}
        </button>
      );
    });
    return <div className="btn-group">{buttonsHTML}</div>;
  }
}

export default ItemStatusFilter;
