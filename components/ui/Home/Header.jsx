import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useThemeContext';

// --- ASSET PLACEHOLDERS ---
const landscapeBg = { uri: 'https://img.freepik.com/free-vector/gradient-mountain-landscape_52683-77407.jpg' };
const avatar = { uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/girl-avatar-6299542-5220261.png' };
// --------------------------

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const buttonBgClass = theme.mode === 'calming' 
    ? 'bg-teal-500' 
    : 'bg-black/20';

  return (
    <View className="h-[300px] w-full">
      <ImageBackground
        source={landscapeBg}
        className="w-full h-full"
        resizeMode="cover"
      >
        {/* --- CHANGE: Changed justify-between to justify-end --- */}
        <View className="absolute top-0 left-0 right-0 p-5 flex-row justify-end items-center mt-5">
          
          {/* --- The "Abigail" Text component has been removed --- */}

          <TouchableOpacity
            onPress={toggleTheme}
            className={`w-11 h-11 rounded-full justify-center items-center ${buttonBgClass}`}
          >
            <Ionicons
              name={theme.mode === 'calming' ? 'headset' : 'headset-outline'}
              size={26}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View className="absolute top-1/3 left-0 right-0 items-center">
          <Image source={avatar} className="w-28 h-28" />
        </View>

        <View className="absolute bottom-4 left-0 right-0 items-center">
          <Text className="text-white text-5xl font-extrabold">25,982</Text>
          <Text className="text-white/80 text-lg font-semibold">COS coins collected</Text>
        </View>
      </ImageBackground>
    </View>
  );
}