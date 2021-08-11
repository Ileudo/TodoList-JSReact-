import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends Component {
  constructor() {
    super();

    this.maxId = 100;
    this.state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make an awesome app"),
      this.createTodoItem("Have a lunch"),
    ]};
  }

  createTodoItem = (text) => {
    return {
      label: text,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  addItem = (text) => {
    // generate unique id
    const newItem = this.createTodoItem(text);

    // add element in array
    this.setState(({todoData}) => {
      const newArray = [...todoData, newItem];
      return {todoData: newArray}
    });
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id);

      // Нельзя изменять существующий State.
      const newArray = [
        ...state.todoData.slice(0,idx), 
        ...state.todoData.slice(idx+1)];

      return {
        todoData: newArray
      }
    });
  }

  toggleProperty(arr, id, propName) {
      const idx = arr.findIndex((el) => el.id === id);

      // 1. update object
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]}

      // 2. construct new array
      const newArray = [
        ...arr.slice(0,idx),
        newItem, 
        ...arr.slice(idx+1)
      ];
      console.log(newArray);

      return newArray;
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {
        return {todoData: this.toggleProperty(todoData, id, 'done')};
    });
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      return {todoData: this.toggleProperty(todoData, id, 'important')};
  });
  }

  render() {
    const {todoData} = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app">
        <AppHeader todo={todoCount} done={doneCount}/>
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
  
        <TodoList 
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}  
        />

          <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    )
  }
}

export default App;