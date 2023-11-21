import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [newText, setNewText] = useState(""); // State to track the new text for updating a todo
  const [updatingTodoId, setUpdatingTodoId] = useState(null); // State to track the ID of the todo being updated

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

    // Cleanup function to handle removal from localStorage when component is unmounted
    return () => {
      const removedTodos =
        JSON.parse(localStorage.getItem("removedTodos")) || [];
      removedTodos.forEach((todoId) => {
        dispatch(removeTodo(todoId));
      });
      localStorage.removeItem("removedTodos");
    };
  }, [todos, dispatch]);

  const handleUpdateClick = (todoId) => {
    setUpdatingTodoId(todoId); // Set the ID of the todo being updated
    const todoToUpdate = todos.find((todo) => todo.id === todoId); // Find the todo with the given ID
    setNewText(todoToUpdate.text); // Set the current text as the initial value for the input field
  };

  const handleUpdateTodo = () => {
    dispatch(updateTodo({ id: updatingTodoId, newText })); // Dispatch the updateTodo action with the new text and todo ID
    setNewText(""); // Clear the input field
    setUpdatingTodoId(null); // Clear the updatingTodoId state
  };

  return (
    <>
      <div className="flex items-center justify-center mt-5">Todos</div>
      <div className="flex items-center justify-center">
        <ul className="list-none w-auto">
          {todos.map((todo) => (
            <li
              className="mt-4 flex  justify-between items-center bg-zinc-800 px-4 py-2 rounded"
              key={todo.id}
            >
              {updatingTodoId === todo.id ? (
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="bg-transparent border-0 focus:outline-none w-full text-white"
                />
              ) : (
                <div className="text-white">{todo.text}</div>
              )}
              <div>
                {updatingTodoId === todo.id ? (
                  <button
                    onClick={handleUpdateTodo}
                    className="text-white bg-green-500 border-0 py-1 ml-12 px-4 focus:outline-none hover:bg-green-600 rounded text-md mr-2"
                  >
                    <svg
                      class="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateClick(todo.id)}
                    className="text-white bg-blue-500 border-0 py-1 ml-12 px-4 focus:outline-none hover:bg-blue-600 rounded text-md mr-2"
                  >
                    <svg
                      class="h-6 w-6 text-red-500"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Todos;
