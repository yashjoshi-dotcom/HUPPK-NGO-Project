import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      // --- STYLE CHANGE: Rounding only the top corners now ---
      className="absolute bg-white rounded-t-2xl flex-row justify-around items-center"
      style={{
        height: 60 + bottom, // The total height includes the safe area
        // --- STYLE CHANGE: Touches the bottom and sides of the screen ---
        bottom: 0,
        left: 0,
        right: 0,
        // This pushes the icons up so they aren't hidden by the home indicator
        paddingBottom: bottom, 
        // --- Shadow for iOS ---
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 }, // Shadow points up now
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // --- Shadow for Android ---
        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icons = {
          index: 'home',
          videoLandingPage: 'play',
          ChoiceBoards: 'list',
        };
        const iconName = icons[route.name] || 'ellipse';

        if (route.name === 'videoLandingPage') {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              className="w-14 h-14 bg-indigo-500 rounded-full justify-center items-center"
              style={{
                transform: [{ translateY: -20 }],
                shadowColor: '#6366F1',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 15,
              }}
            >
              <Ionicons name={iconName} size={30} color="white" />
            </Pressable>
          );
        }

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center h-full"
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? '#6366F1' : '#A0A0A0'}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
// --- END OF CODE ---