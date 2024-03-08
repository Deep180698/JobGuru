import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';
import AppConstants from '../../Storage/AppConstants';

const socket = io(AppConstants.AsyncKeyLiterals.Base_URL); // Replace with your server IP

const Message = () => {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('message', (data) => {
      console.log('Received message:', data);
      setMessages([...messages, data]);
    });

   
      fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://172.19.48.208:3000/api/get-all-messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      // Send a message to the server via HTTP POST
      const response = await axios.post('http://172.19.48.208:3000/api/send-message', {
        user,
        text: message,
      });

      console.log('Message sent successfully via HTTP:', response.data);

      // Emit the message to the server via Socket.IO
      socket.emit('message', { user, text: message });

      setMessage(''); // Clear the message input
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.user}: {item.text}
          </Text>
        )}
      />
      <TextInput
        placeholder="Enter your username"
        value={user}
        onChangeText={(text) => setUser(text)}
      />
      <TextInput
        placeholder="Type a message"
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default Message;
