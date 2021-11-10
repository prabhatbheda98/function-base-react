import React, { useState } from 'react'
import { withRouter } from "react-router-dom";

const TodoList = (props) => {
  const [todoList, setTodolist] = useState(props.todos);

  const editTodo = (i) => {
    props.history.push('/edit/' + i);
  }

  const searchTodo = (e) => {
    const todos = props.todos.filter((todo) => todo.title.toLowerCase().includes(e.target.value));
    setTodolist(todos)
  }

  return (
    <div className="col-6 mx-auto mb-5">
      <div className="mb-5 d-flex justify-content-between">
        <h2 className="text-center">Todo List</h2>
        <div>
          <input type="text" name="search" id="search" className="form-control" onKeyUp={(e) => searchTodo(e)} placeholder="Enter for Search Todo..." />
        </div>
      </div>
      { todoList.length === 0 ?
        <div className="list-group">
          <div className="list-group-item">
            <div className="text-center m-3">
              <h5 className="m-0">No Todo Avaliable in Todolist</h5>
            </div>
          </div>
        </div>
      :
        ( todoList.map((todo, index) => {
          return <div className="list-group" key={index}>
            <div className="list-group-item">
              <div className={todo.complate ? 'complate' : ''}>
                <h5 className="">{todo.title}</h5>
                <p className="todo-desc">{todo.desc}</p>
              </div>
              <div>
                {!todo.complate ? <button className="btn btn-sm btn-info me-3" onClick={() => props.complateTodo(index)}>Complate</button>
                : <button className="btn btn-sm btn-dark me-3" onClick={() => props.complateTodo(index)}>Uncomplate</button> }
                <button className="btn btn-sm btn-warning me-3" onClick={() => editTodo(index)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => props.deleteTodo(index)}>Delete</button>
              </div>
            </div>
          </div>
        }))
      }
    </div>
  )
}

export default withRouter(TodoList)
