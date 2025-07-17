
import { Stack } from 'expo-router';
import {Provider as PaperProvider } from 'react-native-paper';
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';


export default function RootLayout() {
 
  return (
  <PaperProvider theme={DefaultTheme}>
  <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
  </PaperProvider>
  );
  }
