import React, { Component } from 'react';
import './todo-list-item.css';

class TodoListItem extends Component {
  render() {
    const {
      todoText,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;

    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    if (important) {
      classNames += ' important';
    }

    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToggleDone}>
          {todoText}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation"></i>
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm"
          onClick={onDeleted}
        >
          <i className="fa fa-trash"></i>
        </button>
      </span>
    );
  }
}

export default TodoListItem;
