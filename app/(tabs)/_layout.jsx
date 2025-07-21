
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

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
        name="taskPlan" // This will be the file `app/(tabs)/taskPlan.jsx`
        options={{
          title: 'task plan',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="check-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="instagram" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videoLandingPage"
        options={{
          title: 'video home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="play" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="socialStoriesVideos" // This will be the file `app/(tabs)/taskPlan.jsx`
        options={{
          title: 'video player',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="film" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}