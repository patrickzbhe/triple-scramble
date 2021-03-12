import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align="left" ><b>{trimmedName}</b>: {text}</ListItemText>
            </Grid>
        </Grid>
        </div>
        )
        
        : (
        <Grid container>
            <Grid item xs={12}>
                <ListItemText align="left" ><b>{user}</b>: {text}</ListItemText>
            </Grid>
        </Grid>
        )
  );
}

export default Message;