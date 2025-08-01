import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/ui/Navigation/CustomTabBar'; // Import our new component

export default function TabLayout() {
  return (
    <Tabs
      // This is the magic prop!
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          // We no longer need title or icon options here
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="videoLandingPage"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ChoiceBoards"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}