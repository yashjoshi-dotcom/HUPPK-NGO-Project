// app/_layout.jsx
import 'react-native-reanimated'; // 👈 must be first
import { Stack } from 'expo-router';
import { useTheme, ThemeProvider } from '../hooks';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import '../styles/global.css';
import { StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StreakProvider } from '../hooks/steakContext.js';

enableScreens(); 

function RootLayoutNav() {
  const { theme } = useTheme();

  // Start from the default MD3 light theme, then override its colors
  // based on your selected `theme` object.
  const paperTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,

      // Text and icons
      onSurface: theme.text,
      surfaceVariant: theme.background,
      surface: theme.background,

      // Primary buttons, toggles, etc.
      primary: theme.tint,
      secondary: theme.icon,

      // Backgrounds
      background: theme.background,

      // If you want to theme more slots you can override:
      // tertiary: theme.tabIconDefault,
      // etc.
    },
  };

  return (
     <GestureHandlerRootView style={styles.flex}>
    <PaperProvider theme={paperTheme}>
      <StreakProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="choiceBoards/ChoiceBoards" options={{ title: 'Choice Boards' }} />
        </Stack>
      </StreakProvider>
    </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});