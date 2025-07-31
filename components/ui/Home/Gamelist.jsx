import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Helper component for the game cards to avoid repetition
const GameCard = ({ title, icon, color, iconColor }) => (
  <TouchableOpacity
    className={`w-40 h-40 rounded-3xl p-4 justify-between mr-4 ${color}`}
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}
  >
    <View className={`w-10 h-10 rounded-full justify-center items-center ${iconColor}`}>
      <Ionicons name={icon} size={24} color="white" />
    </View>
    <Text className="text-black text-lg font-bold">{title}</Text>
  </TouchableOpacity>
);

export default function GameList() {
  return (
    <View className="mt-6 px-5">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Let's Play!</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <GameCard title="Picture Quiz" icon="images-outline" color="bg-purple-300" iconColor="bg-purple-400" />
        <GameCard title="Sorting Game" icon="swap-horizontal-outline" color="bg-yellow-300" iconColor="bg-yellow-400" />
        <GameCard title="Emotion Game" icon="happy-outline" color="bg-blue-300" iconColor="bg-blue-400" />
      </ScrollView>
    </View>
  );
}