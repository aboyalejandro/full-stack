import './App.css';
import Todo from './Todo';
import React, {useEffect, useState} from 'react';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core'
import db from './firebase'
import firebase from "firebase"

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // console.log(input)
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data().todo))
      // setTodos(snapshot.docs.map(doc => doc.data().todo))
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])


  const addTodo = (event) => {
    event.preventDefault(); 
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() 
    })
    setTodos([...todos, input]);
    setInput('');
    // console.log(todos)
  }

  return (
    <div className="App">
      <h1>Hello world 🚀</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo 🖇️</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        
        <Button disabled={!input} type="submit" onClick={addTodo} variant="container" color="primary">
          Add Todo
          </Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
