import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// --- ASSET PLACEHOLDERS ---
// Replace these with your actual assets once you have them
const landscapeBg = { uri: 'https://img.freepik.com/free-vector/gradient-mountain-landscape_52683-77407.jpg' };
const avatar = { uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/girl-avatar-6299542-5220261.png' };
// --------------------------

export default function Header() {
  return (
    <View className="h-[300px] w-full">
      <ImageBackground
        source={landscapeBg}
        className="w-full h-full"
        resizeMode="cover"
      >
        <View className="absolute top-0 left-0 right-0 p-5 flex-row justify-between items-center mt-8">
          <Text className="text-white text-2xl font-bold">Abigail</Text>
          <View className="w-10 h-10 bg-green-400/50 rounded-full justify-center items-center">
            <Ionicons name="checkmark-sharp" size={24} color="white" />
          </View>
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