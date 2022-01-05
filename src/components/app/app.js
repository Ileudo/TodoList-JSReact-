import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import theme from '../theme/theme';

import './app.css';
import MyDatePicker from '../calendar';
import TimePicker from '../time-picker/time-picker';
import { Grid } from '@mui/material';

class App extends Component {
  constructor() {
    super();

    this.maxId = 100;
    this.state = {
      todoData: [
        this.createTodoItem('Drink Coffee'),
        this.createTodoItem('Make an awesome app'),
        this.createTodoItem('Have a lunch'),
      ],
      searchInput: '',
      currentFilter: 'all', // active, all, done
    };
  }

  createTodoItem = (todoText) => {
    return {
      todoText: todoText,
      important: false,
      done: false,
      id: this.maxId++,
    };
  };

  addItem = (todoText) => {
    // generate unique id
    const newItem = this.createTodoItem(todoText);

    // add element in array
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  deleteItem = (id) => {
    this.setState((state) => {
      const idx = state.todoData.findIndex((el) => el.id === id);

      // Нельзя изменять существующий State.
      const newArray = [...state.todoData.slice(0, idx), ...state.todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    // 1. update object
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    // 2. construct new array
    const newArray = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

    return newArray;
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'done') };
    });
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'important') };
    });
  };

  onSearchChange = (searchInput) => {
    this.setState({ searchInput });
  };

  search(todos, searchInput) {
    if (searchInput.length === 0) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.todoText.toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
    });
  }

  onFilterChange = (currentFilter) => {
    this.setState({ currentFilter });
  };

  filter(todos, filterInput) {
    switch (filterInput) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.done);
      case 'done':
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  }

  render() {
    const { todoData, searchInput, currentFilter } = this.state;

    const searchedTodos = this.search(todoData, searchInput);
    const visibleTodos = this.filter(searchedTodos, currentFilter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <div className="todo-app">
            <AppHeader todo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
              <SearchPanel onSearchChange={this.onSearchChange} />
              <ItemStatusFilter currentFilter={currentFilter} onFilterChange={this.onFilterChange} />
            </div>
            <TodoList
              todos={visibleTodos}
              onDeleted={this.deleteItem}
              onToggleImportant={this.onToggleImportant}
              onToggleDone={this.onToggleDone}
            />
            <ItemAddForm onItemAdded={this.addItem} />
            <Grid container>
              <Grid item xs={12} my={2}>
                <MyDatePicker />
              </Grid>
              <Grid item xs={12}>
                <TimePicker />
              </Grid>
            </Grid>
          </div>
        </StyledEngineProvider>
      </ThemeProvider>
    );
  }
}

export default App;
