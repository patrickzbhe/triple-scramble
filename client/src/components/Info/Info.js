import React from 'react';

import './Info.css';

const Info = ({ users, keyword }) => (
  <div className="textContainer">
    <div>
      
     
    </div>
    {
      users
        ? (
          <div>
            <h1>Lobby:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name, wins}) => (
                  <div key={name} className="activeItem">
                    {name}: {wins}
               
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default Info;