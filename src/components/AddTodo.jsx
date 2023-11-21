import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice'


function AddTodo() {  // addtodo means something adding store . how to add value in store ? usedispatch()   so, Some event will have to be dispatched

    const [input, setInput] = React.useState('')
    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }

  return (
    <form onSubmit={addTodoHandler} className="flex items-center justify-center mt-12">
  <input
    type="text"
    className="bg-gray-800 rounded mr-4 border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
    placeholder="Enter a Todo..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
  <button
    type="submit"
    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  >
    Add Todo
  </button>
</form>
  )
}

export default AddTodo
