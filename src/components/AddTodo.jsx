import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddTodo = (props) => {
  const initialTodo = {
    id: null,
    title: '',
    desc: '',
    complate: false
  }

  const [todo, setTodo] = useState(initialTodo)

  const inputChange = (e) => {
    const { name, value } = e.target
    setTodo({...todo, [name]: value})
  }

  const submitTodo = (e) => {
    e.preventDefault();
    if(!todo.title || !todo.desc){
      toast.warning('All field is required.!')
      return
    }
    todo.id = new Date().getTime();
    props.addTodo(todo);
    setTodo(initialTodo);
  }

  return (
    <div className="col-4 mx-auto">
      <div className="mb-5">
        <h2 className="text-center">Add Todo</h2>
      </div>
      <form onSubmit={submitTodo} method="POST">
        <div className="mb-4">
          <label htmlFor="todo-title" className="form-label">Todo Title</label>
          <input type="text" name="title" id="title" value={todo.title} onChange={inputChange} className="form-control" placeholder="Enter Todo Title" />
        </div>
        <div className="mb-4">
          <label htmlFor="todo-desc" className="form-label">Todo Description</label>
          <textarea name="desc" id="desc" value={todo.desc} onChange={inputChange} className="form-control" rows="2" placeholder="Enter Todo Description"></textarea>
        </div>
        <div className="float-end">
          <button type="submit" className="btn btn-outline-success">Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddTodo
