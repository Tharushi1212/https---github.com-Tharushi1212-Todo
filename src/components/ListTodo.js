import React, { Fragment ,useEffect, useState} from 'react'
import EditTodo from './EditTodo';

const ListTodo = () => {
  const[todos, setTodos] = useState([]);

  //delete specific id data
  const deleteTodo = async(id)=>{
    try {
    const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
      method:"DELETE"
    });
    console.log(deleteTodo);
//filter out all the data except the deleted id
    setTodos(todos.filter(todo=>todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  }
  // window.location = "/";

  //retieve data
const getTodos =async()=>{
try {
  const response = await fetch("http://localhost:5000/todos")//fetch data
  const jsonData = await response.json();//store json data

  setTodos(jsonData);
  
} catch (err) {
  console.err(err.message);
}
}

useEffect (()=>{
  getTodos();
},[])
console.log(todos);
  return (
    <Fragment>
      <table className ="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr> */}
      {todos.map(todo =>(
        <tr key={todo.todo_id}>
          <td>{todo.description}</td>
          <td><EditTodo todo={todo}/></td>
          <td><button className='btn btn-danger' onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
    </Fragment>
  )
}

export default ListTodo