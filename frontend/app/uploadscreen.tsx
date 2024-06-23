import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }
  };

  const uploadFile = async () => {
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
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Button title="Pick a file" onPress={pickFile} />
      <Button title="Upload file" onPress={uploadFile} disabled={!file} />
    </View>
  );
};

export default UploadFile;