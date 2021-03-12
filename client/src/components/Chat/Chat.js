import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import Info from '../Info/Info';
import Message from '../Message/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';

import Input from  '@material-ui/core/Input';

//const ENDPOINT = 'localhost:5000/';
const ENDPOINT = 'https://triplescramble.herokuapp.com/';

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io.connect(ENDPOINT, connectionOptions);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users, keyword }) => {
      setUsers(users);
      setKeyword(keyword);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message);
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
    <div className="outerContainer" style={{display:'flex',justifyContent:'center',height:'100vh'}}>
      
      <div style={{height: '60%', width: '33%', flexDirection: 'column', display: 'flex'}}>
      <h1>Find the word that contains: {keyword}</h1>
            <ScrollToBottom className="messages">
                {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
            </ScrollToBottom>
            <form className="form">
            <Input
                className="input"
                type="text"
                placeholder="Guess the word!"
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
      
        </form>
          
        <Info users={users} keyword ={keyword}/>
      </div>
      
    </div>
  );
}

export default Chat;