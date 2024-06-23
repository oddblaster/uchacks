import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert, Button, Text, ScrollView, Platform} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

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
  const transcribeApiURL = 'https://search-party-backend-flax.vercel.app/api/transcribe'

  const Buttonpress = async () => {
    navigation.navigate('roomchat');
  }

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
    const intervalId = setInterval(fetchData, 10000000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


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
        <TouchableOpacity
        style={styles.moveButton}
        onPress={Buttonpress} // Corrected
      >
        <ThemedText type="button">Chatroom</ThemedText>
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
    color: '#000000',
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