// app/(tabs)/_layout.jsx

import { Tabs } from 'expo-router';
import { useTheme } from '../../hooks';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        // FIX: Pass primitive values from the theme object, not the object itself.
        tabBarStyle: {
          backgroundColor: theme.tabBarStyle.backgroundColor,
          borderTopColor: theme.tabBarStyle.borderTopColor,
          borderTopWidth: theme.tabBarStyle.borderTopWidth,
        },
        headerStyle: {
          backgroundColor: theme.headerStyle.backgroundColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.headerStyle.color,
        },
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
            <FontAwesome
              name={theme.mode === 'light' ? 'leaf' : 'heartbeat'}
              size={22}
              color={theme.headerStyle.color} // Use the primitive color value
            />
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <FontAwesome name="cog" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => <FontAwesome name="gamepad" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ChoiceBoards"
        options={{
          title: 'Choice Boards',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="checklist" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}