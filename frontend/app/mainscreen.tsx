import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert, Button, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const HelloWorldScreen = () => {
  const route = useRoute();
  const imageURL = route.params?.imageURL;
  const navigation = useNavigation();
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);

    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setRecordings(prevRecordings => [
      ...prevRecordings,
      {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }
    ]);

    sound.replayAsync();  // Play the recording immediately after stopping
  }

  function getDurationFormatted(milliseconds) {
    const minutes = Math.floor(milliseconds / 1000 / 60);
    const seconds = Math.round((milliseconds / 1000) % 60);
    return seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.localImage} />
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <Image source={{ uri: "https://i.imgur.com/w9L9ZkH.png" }} style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  localImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 60,
    paddingVertical: 60,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recognizedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HelloWorldScreen;