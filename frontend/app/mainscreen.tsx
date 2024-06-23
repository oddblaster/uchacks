import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Alert, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as Audio from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Voice from '@react-native-voice/voice';
import * as Permissions from 'expo-permissions';

const HelloWorldScreen = () => {
  const route = useRoute();
  const imageURL = route.params?.imageURL;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageURL }} style={styles.localImage} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('recordingscreen')}>
        <ThemedText type="subtitle">Next</ThemedText>
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
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  recognizedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HelloWorldScreen;
