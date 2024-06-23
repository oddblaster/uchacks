import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { audioRecorder } from 'react-native-audio-recorder';

const imageUrl = 'https://i.imgur.com/w9L9ZkH.png';

export default function HelloWorldScreen() {
  const [isRecording, setIsRecording] = useState(false);

  const handleImagePress = async () => {
    if (!isRecording) {
      try {
        console.log(audioRecorder)
        const filePath = 'path/to/save/test.aac'; // Replace with your desired file path
        await audioRecorder.startRecording(filePath);
        setIsRecording(true);
        console.log('Recording started.');
      } catch (error) {
        console.error('Failed to start recording.', error);
      }
    } else {
      try {
        const filePath = await audioRecorder.stopRecording();
        setIsRecording(false);
        console.log('Recording stopped. File saved at: ' + filePath);
        // Add logic to handle the recorded audio file, e.g., play, upload, etc.
      } catch (error) {
        console.error('Failed to stop recording.', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText type="subtitle">Show Map Here and Audio Button</ThemedText>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={{ uri: imageUrl }} style={styles.localImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  localImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 300,
    marginBottom: 20, // Adjust this value for spacing
  },
});
