import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Header from '../../components/ui/Home/Header';
import GameList from '../../components/ui/Home/Gamelist';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" />
      {/* --- REMOVE nestedScrollEnabled={true} --- */}
      <ScrollView scrollEventThrottle={16}>
        <Header />
        <GameList />
      </ScrollView>
    </SafeAreaView>
  );
}