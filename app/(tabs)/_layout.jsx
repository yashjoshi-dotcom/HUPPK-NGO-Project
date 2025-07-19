import { Tabs } from 'expo-router';
import { useTheme } from '../../hooks';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabLayout() {
  const {theme,toggleTheme} = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: theme.tabBarStyle,
        headerStyle: {
          backgroundColor: theme.headerStyle.backgroundColor || '#f0f0f0',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.headerStyle.color || '#000',
        },
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={{ marginRight: 15 }}>
            <FontAwesome
              name={theme.mode === "light" ? "leaf" : "heartbeat"} // Example icons
              size={22}
              color={theme.headerStyle.color}
            />
          </Pressable>
        ),
      }}>
      <Tabs.Screen
        name="index" // This is the file `app/(tabs)/index.jsx`
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // This will be the file `app/(tabs)/settings.jsx`
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="game" // This is the file `app/(tabs)/game.jsx`
        options={{
          title: 'Game',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gamepad" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ChoiceBoards" // This will be the file `app/(tabs)/ChoiceBoards.jsx`
        options={{
          title: 'ChoiceBoards',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}