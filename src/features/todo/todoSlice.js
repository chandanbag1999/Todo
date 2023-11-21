import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [{ id: 1, text: "Hello world" }],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // state acess the initial state and action works anything do action in your state
      const todo = {
        id: nanoid(), // this method is generate a unique id
        text: action.payload, //.text // payload is a inbuild object
      };
      state.todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(state.todos))
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    
    updateTodo: (state, action) => {
      const {id, newText} = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      
      if(todo) {
        todo.text = newText;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }

    }

  },
});
  
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;  // using for every Component

export default todoSlice.reducer;