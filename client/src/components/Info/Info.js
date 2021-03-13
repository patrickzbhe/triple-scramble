import React from 'react';

const Info = ({ users, keyword }) => (
  <>
    {users
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
  </>
);

export default Info;