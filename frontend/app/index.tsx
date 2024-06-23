import React, { useState, useContext, ReactNode} from 'react';
import { Image, StyleSheet, Platform, Button, View, Alert, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handlePress = async () => {
    try {
      const response = await fetch('https://search-party-backend-flax.vercel.app/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const data = await response.json();

      Alert.alert('User created', `Your user ID is: ${data[0].id}`);
      
      // Navigate to the next screen if needed
      // navigation.navigate('NextScreen');

    } catch (error) {
      console.error('Error creating user:', error);
      //@ts-ignore
      Alert.alert('Failed to create user', error.message);
    }
    
    //@ts-ignore
    navigation.navigate('uploadscreen');
  };

  const handleInputChange = (text: string) => {
    setName(text);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#151718', dark: '#151718' }}
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
        value={name}
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