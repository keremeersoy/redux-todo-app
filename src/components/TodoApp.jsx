// TodoApp.jsx

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, setFilter } from "../redux/todoSlice";
import { Filters } from "../filters";
import { CgRadioCheck, CgRadioChecked } from "react-icons/cg";

function TodoApp() {
  const todos = useSelector((state) => state.todo.todos);
  const filter = useSelector((state) => state.todo.filter);
  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    const text = e.target.todoText.value.trim();
    if (text) {
      dispatch(addTodo({ text }));
      e.target.todoText.value = "";
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo({ id }));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter({ filter }));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === Filters.SHOW_COMPLETED) {
      return todo.completed;
    } else if (filter === Filters.SHOW_ACTIVE) {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className="">
      <div className="m-10">
        <form
          onSubmit={handleAddTodo}
          className="bg-[#CFB997] rounded-full p-6 flex "
        >
          <input
            type="text"
            name="todoText"
            className="w-full rounded-full px-4 focus:outline-none"
          />
          <button
            type="submit"
            className="text-white rounded-full ml-4 p-2 w-96 border-2 hover:bg-white hover:text-[#CFB997] duration-300"
          >
            Add Todo
          </button>
        </form>
        <div className="grid grid-cols-3 p-10">
          <button
            onClick={() => handleFilterChange(Filters.SHOW_ALL)}
            className={`mx-10 p-2 rounded-full text-gray-200 duration-300 border-2  ${
              filter === "all" ? "bg-[#CFB997]" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange(Filters.SHOW_ACTIVE)}
            className={`mx-10 p-2 rounded-full text-gray-200 duration-300 border-2  ${
              filter === "active" ? "bg-[#CFB997]" : ""
            }`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange(Filters.SHOW_COMPLETED)}
            className={`mx-10 p-2 rounded-full text-gray-200 duration-300 border-2  ${
              filter === "completed" ? "bg-[#CFB997]" : ""
            }`}
          >
            Completed
          </button>
        </div>
        <ul className="p-10  rounded-xl">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleToggleTodo(todo.id)}
              //   style={{
              //     textDecoration: todo.completed ? "line-through" : "none",
              //   }}
              className={`flex items-center bg-[#7B8FA1] m-4 p-4 rounded-md cursor-pointer duration-300 ${
                todo.completed ? "line-through text-gray-600" : "text-gray-200"
              }`}
            >
              {todo.completed ? (
                <CgRadioChecked className="text-xl" />
              ) : (
                <CgRadioCheck className="text-xl" />
              )}
              <p className="ml-4">{todo.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
