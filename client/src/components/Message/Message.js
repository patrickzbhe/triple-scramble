import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const formattedName = user.trim().toLowerCase();

  return <ListItemText align="left" ><b>{formattedName}</b>: {text}</ListItemText>;
}

export default Message;