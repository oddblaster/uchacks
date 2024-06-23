import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useChat } from './usechat'; // Import the mock useChat hook

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/ex5',
    onError: (e) => {
      console.log(e);
    },
  });

  const chatParent = useRef<FlatList>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>LangChain Chat</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question here..."
          value={input}
          onChangeText={handleInputChange}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
      <FlatList
        ref={chatParent}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#FFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    minHeight: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  messageList: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '75%',
  },
  userMessage: {
    backgroundColor: '#E1FFC7',
    alignSelf: 'flex-start',
  },
  botMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
});

export default Chat;