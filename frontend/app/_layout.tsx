import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="uploadscreen" 
        options={{ 
          title: 'Upload', 
          headerStyle: { backgroundColor: '#151718' }, // Change the background color
          headerTintColor: '#fff', // Change the text color
        }} 
      />
      <Stack.Screen 
        name="mainscreen" 
        options={{ 
          headerShown: false
        }} 
      />
    </Stack>
  );
}