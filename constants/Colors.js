/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    mode: 'light',
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabBarStyle: {
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#ccc',
    },
    headerStyle: {
      color: '#151718',
      backgroundColor: '#fff',
    },
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  calming: {
    mode: 'calming',
    text: '#2e3b3b',                 // muted deep green-gray for readability
    background: '#e6f4f1',           // soft aqua background
    tint: '#6ab7a8',                 // seafoam green
    icon: '#5d7878',                 // soft muted green
    tabBarStyle: {
      backgroundColor: '#d3ede7',   // soft seafoam
      borderTopWidth: 1,
      borderTopColor: '#a8cfc8',    // complementary border
    },
    headerStyle: {
      color: '#2e3b3b',
      backgroundColor: '#e6f4f1',   // consistent with page background
    },
    tabIconDefault: '#7da9a0',
    tabIconSelected: '#6ab7a8',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
