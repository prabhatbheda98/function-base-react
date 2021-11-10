import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';

const App = () => {
  let getTodo = [];
  if(localStorage.getItem('todos')) {
    getTodo = JSON.parse(localStorage.getItem('todos'))
  }

  const [todos, setTodos] = useState(getTodo);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
    toast.success('Todo Added Successfully.!');
  }

  const updateTodo = (editTodo) => {
    const todo = todos.map(item => {
      if(item.id === editTodo.id){
        item.title = editTodo.title;
        item.desc = editTodo.desc;
        item.complate = editTodo.complate;
      }
      return item;
    })
    setTodos(todo);
    toast.success('Todo Updated Successfully.!');
  }

  const complateTodo = (i) => {
    todos[i].complate = todos[i].complate ? false : true ;
    setTodos([...todos]);
    toast.success('Todo Status Changed Successfully.!');
  }

  const deleteTodo = (i) => {
    todos.splice(i, 1)
    setTodos([...todos]);
    toast.success('Todo Deleted Successfully.!');
  }

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <div className="container mt-5">
      <Switch>
        <Route exact path="/"> <Redirect to="/todos" /> </Route>
        <Route exact path="/todos" component={() => <TodoList todos={todos} complateTodo={complateTodo} deleteTodo={deleteTodo} />} />
        <Route exact path="/add" component={() => <AddTodo addTodo={addTodo} />} />
        <Route exact path="/edit/:id" component={() => <EditTodo todos={todos} updateTodo={updateTodo} />} />
      </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App