
import { Stack } from 'expo-router';
import { ThemeProvider } from '../hooks';
import {Provider as PaperProvider,MD3LightTheme as DefaultTheme  } from 'react-native-paper';
import "../styles/global.css"

export default function RootLayout() {
 
  return (

   <ThemeProvider>
      <PaperProvider theme={DefaultTheme}>
      <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      </PaperProvider>
   </ThemeProvider>
  );
  }
