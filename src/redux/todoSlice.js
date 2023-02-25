import { Filters } from "../filters";

import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    filter: Filters.SHOW_ALL,
  },
  reducers: {
    addTodo: (state, action) => {
      const { text } = action.payload;
      state.todos.push({
        id: nanoid(),
        text,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { addTodo, toggleTodo, setFilter } = todoSlice.actions;

export default todoSlice.reducer;
