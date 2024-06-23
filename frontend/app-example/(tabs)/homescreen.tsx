import React, { useState, useContext, ReactNode} from 'react';
import { Image, StyleSheet, Platform, Button, View, Alert, TextInput} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const handlePress = () => {
    Alert.alert('Button pressed!');
  };
  const handleInputChange = (text: string) => {
    setInputValue(text);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#151718' }}
      headerImage={<View style={{ width: 10, height: 10 }} />} // Minimal placeholder image
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! Please add a name and join the group!</ThemedText>
      </ThemedView>
      <View style={styles.subtitleContainer}>
        <ThemedText type="subtitle">Please enter your name:</ThemedText>
      </View>
      <ThemedView>
        <TextInput
        style={[styles.input, { color: '#FFFFFF'}]}
        placeholder=""
        onChangeText={handleInputChange}
        value={inputValue}
        />
      <View style={styles.buttonContainer}>
        <Button title="Enter" onPress={handlePress} />
      </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  subtitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#FFFFFF'
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

