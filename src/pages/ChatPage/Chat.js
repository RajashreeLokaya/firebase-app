import React, { useState, useEffect, useRef } from "react";
import { firebaseRealTimeDb } from "../../config/FirebaseConfig";
import { ref, onValue, push } from "firebase/database";
import { useAuth } from "../../contex/AuthContext";
import { TextField, Button, Paper, Typography, List, ListItem } from "@mui/material";
import "./Chat.css"; 

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const messageInputRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const messagesRef = ref(firebaseRealTimeDb, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messageData = snapshot.val();
      if (messageData) {
        const messageList = Object.keys(messageData).map((key) => ({
          ...messageData[key],
          id: key,
        }));
        setMessages(messageList);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    const messageRef = ref(firebaseRealTimeDb, "messages");
    const newMessage = messageInputRef.current.value;

    if (newMessage.trim() === "") return;

    const message = {
      message: newMessage,
      timestamp: Date.now(),
      email: currentUser.email,
      name: currentUser.displayName ? currentUser.displayName : (currentUser.email ? currentUser.email.split('@')[0]:'User'),
    };
    push(messageRef, message);
    messageInputRef.current.value = "";
  };

  return (
    <Paper className="chat-container">
      <Typography variant="h4" gutterBottom>
        Chat App
      </Typography>

      <List className="message-list">
        {messages.map((message) => (
          <ListItem key={message.id} className={`message-item ${message.email === currentUser.email ? 'message-right' : 'message-left'}`}>
            <Typography variant="body1">
              <strong>{message.name}:</strong> {message.message}
            </Typography>
          </ListItem>
        ))}
      </List>

      <form onSubmit={handleMessageSubmit} className="message-form">
        <TextField
          label="Type a message"
          inputRef={messageInputRef}
          variant="outlined"
          className="input-field"
        />
        <Button
          type="submit"
          variant="contained"
          className="send-button"
        >
          Send
        </Button>
      </form>
    </Paper>
  );
};

export default ChatApp;
