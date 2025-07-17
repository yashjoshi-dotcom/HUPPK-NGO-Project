
import { Tabs } from 'expo-router';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // You can set this to false if you don't want a header
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
          title: 'explore',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="ChoiceBoards" // This will be the file `app/(tabs)/ChoiceBoards.jsx`
        options={{
          title: 'ChoiceBoards',
          tabBarIcon: ({ color, size }) => (
           <MaterialIcons name="checklist" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}