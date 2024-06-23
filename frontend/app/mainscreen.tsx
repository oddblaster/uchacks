import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert, Button, Text, ScrollView} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const HelloWorldScreen = () => {
  const route = useRoute();
  const imageURL = route.params?.imageURL;
  const userId = route.params?.userId;
  const userName = route.params?.name;
  const navigation = useNavigation();
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [dataFromApi, setDataFromApi] = useState([]);
  const curIdRef = useRef(0);
  const [curId, setCurId] = useState(0);
  const [curAudio, setCurAudio] = useState('');
  const apiUrl = 'https://search-party-backend-flax.vercel.app/api/get-bulletins';

  const playAudio = async (audioUrl) => {
    if (audioUrl) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl }
        );
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.log('Error loading or playing sound', error);
        Alert.alert('Error', 'Failed to load or play the sound.');
      }
    }
  };

   // Function to fetch data from API
   const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);

      if (!response.data || !response.data.bulletins) {
        throw new Error('Failed to retrieve bulletins');
      }

      const bulletins = response.data.bulletins;
      setDataFromApi(bulletins);

      const latestId = bulletins[0]?.id || 0;
      if (latestId !== curIdRef.current) {
        curIdRef.current = latestId;
        setCurId(latestId);
        const latestAudio = bulletins[0]?.audio_link || '';
        setCurAudio(latestAudio);
        await playAudio(latestAudio); // Play audio when the ID updates
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Failed to fetch data', error.message);
    }
  };

  // Start polling on component mount
  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  //TODO: delete this if it becomes obsolete
  const handleMoveQuadrantPress = async () => {
    try {
      const response = await axios.put('https://search-party-backend-flax.vercel.app/api/update-user', {
        id: userId,
        name: userName,
        location: selectedOption,
      });

      Alert.alert('Moved ' + userId + ' to quadrant ' + selectedOption);
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Failed to update user', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.localImage} />
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <Image source={{ uri: "https://i.imgur.com/w9L9ZkH.png" }} style={styles.button} />
      </TouchableOpacity>

      <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue) => setSelectedOption(itemValue)}
          style={styles.picker}
        >
          {[...Array(16)].map((_, index) => (
            <Picker.Item key={index} label={`Q${index + 1}`} value={`${index + 1}`} />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.moveButton}
          onPress={handleMoveQuadrantPress}
        >
          <ThemedText type="button">Move Quadrant</ThemedText>
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
  picker: {
    width: 250,
    height: 200,
    color: '#ffffff',
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  moveButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default HelloWorldScreen;