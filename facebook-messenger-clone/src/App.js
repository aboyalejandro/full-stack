import './App.css';
import React, {useState, useEffect} from 'react'
import {Button, FormControl, Input, InputLabel} from "@material-ui/core"
import Message from "./Message"
import db from "./firebase"
import firebase from "firebase"
import FlipMove from "react-flip-move"
import SendIcon from "@material-ui/icons/Send"
import {IconButton} from "@material-ui/core"

function App() {
const [input, setInput] = useState("");
const [messages, setMessages] = useState([]);
const [username, setUsername] = useState("")
//console.log(input)
//console.log(messages)

useEffect(() => {
  db.collection('messages')
  .orderBy('timestamp','desc')
  .onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
  })
},[])

useEffect(() => {
  setUsername(prompt('Please enter your name'))
}, [])

const sendMessage = (event) => {
  event.preventDefault();
  // setMessages([...messages, input]) //Keep the current and append the ending one
  
  db.collection("messages").add({
    message: input, 
    username: username, 
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  
  // setMessages([...messages, {username: username, text: input}]) //Keep the current and append the ending one
  setInput("");
}

  return (
    <div className="App">
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome {username} </h2>
      <form className="app_form">
        <FormControl className="app_formControl">
          <InputLabel>Enter a message...</InputLabel>
          <Input className="app_input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/> 
          <IconButton className="app_iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon className="app_sendIcon"/> 
          </IconButton>
        </FormControl>
      </form>

      {/*messages themselves */}
  <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message 
              key={id}
              username={username} 
              message={message}
            />
            //<p>{message}</p>
          ))
        }
  </FlipMove>
    </div>
  );
}

export default App;
