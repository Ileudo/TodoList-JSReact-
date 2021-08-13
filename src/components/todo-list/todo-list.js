import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
  const todosHTML = todos.map((item) => {
    const { id, ...todoProps } = item;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...todoProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{todosHTML}</ul>;
};

export default TodoList;
