import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useParams, withRouter } from 'react-router-dom'

const EditTodo = (props) => {
  const { id } = useParams(); 
  const initialTodo = {
    id: props.todos[id].id,
    title: props.todos[id].title,
    desc: props.todos[id].desc,
    complate: props.todos[id].complate
  }

  const [todo, setTodo] = useState(initialTodo)
  
  const inputChange = (e) => {
    const { name, value } = e.target
    setTodo({...todo, [name]: value})
  }

  const checkChange = (e) => {
    setTodo({...todo, complate: todo.complate ? false : true})
  }

  const submitTodo = (e) => {
    e.preventDefault();
    if(!todo.title || !todo.desc){
      toast.warning('All field is required.!')
      return
    }
    props.updateTodo(todo);
    props.history.push('/todos');
  }

  return (
    <div className="col-4 mx-auto">
      <div className="mb-5">
        <h2 className="text-center">Update Todo</h2>
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
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="checkbox" id="checkbox" checked={todo.complate} onChange={checkChange} />
          <label className="form-check-label" htmlFor="checkbox"> Todo Complate </label>
        </div>
        <div className="float-end">
          <button type="submit" className="btn btn-outline-success">Update</button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(EditTodo)
