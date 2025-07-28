// app/_layout.jsx

import { Stack } from 'expo-router';
import { useTheme, ThemeProvider } from '../hooks';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import '../styles/global.css';


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
    <PaperProvider theme={paperTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="choiceBoards/ChoiceBoards" options={{ title: 'Choice Boards' }} />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}
