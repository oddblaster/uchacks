import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const UploadScreen = () => {
  const route = useRoute();
  const userId = route.params?.userId;
  const name = route.params?.name;
  const [file, setFile] = useState(null);
  const navigation = useNavigation();

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.canceled == false) {
      setFile(result.assets[0]);
    }
  };

  const uploadFile = async () => {
    let image = null;
    if (!file) return;
    let formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: 'image/png' // or the appropriate MIME type for your file
    });

    try {
      let response = await fetch('https://search-party-backend-flax.vercel.app/api/upload-map', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      let responseJson = await response.json();

      image = responseJson.processedURL;


    } catch (error) {
      console.error(error);
    }

    navigation.navigate('mainscreen', {imageURL : image, userId: userId, name: name});
    
  };

  const deleteId = async () => {
    try {
      const response = await fetch('https://search-party-backend-flax.vercel.app/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const message = await response.json();

      Alert.alert('User deleted');
      
      // Navigate to the next screen if needed
      // navigation.navigate('NextScreen');

    } catch (error) {
      console.error('Error creating user:', error);
      //@ts-ignore
      Alert.alert('Failed to create user', error.message);
    }
  };

  return (
    <View>
      <Button title="Pick a file" onPress={pickFile} />
      <Button title="Upload file" onPress={uploadFile} disabled={!file} />
      <Button title="Delete ID" onPress={deleteId} />
    </View>
  );
};

export default UploadScreen;