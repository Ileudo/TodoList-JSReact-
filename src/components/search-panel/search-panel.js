import React, { Component } from 'react';

import './search-panel.css';

class SearchPanel extends Component {
  onSearchChange = (e) => {
    const searchInput = e.target.value;
    this.props.onSearchChange(searchInput);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onSearchChange}
      />
    );
  }
}

export default SearchPanel;
