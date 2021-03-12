import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Input, Button } from  '@material-ui/core/';

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (    
    <div  className='container'>
      <div >
        <h1 className="heading">Welcome to Triple Scramble</h1>
        <div>
          <Input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} style={{margin: 5}}/>
        </div>
        <div>
          <Input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} style={{margin: 5}}/>
        </div>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} >
          <Button color="primary" type="submit" style={{margin: 5}}  variant="contained">Join Room</Button>
        </Link>
      </div>
    </div>
  );
}