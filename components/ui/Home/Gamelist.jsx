import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use expo-router if that's what you're using

export default function GameList() {
  const router = useRouter();
  
  // Game data
  const games = [
    { id: '4', title: 'Fruit or Veggie?', icon: 'grid-outline', color: '#FFB6C1', iconColor: '#F87171', link : '(stack)/classify',
      image:require('../../../assets/images/gamescreens/fruits.png') },
    { id: '3', title: 'Shadow Friends', icon: 'happy-outline', color: '#87CEFA', iconColor: '#60A5FA', link : '(stack)/game',
      image:require('../../../assets/images/gamescreens/shadow.png') },
    { id: '2', title: 'Even or Odd?', icon: 'swap-horizontal-outline', color: '#FFDE59', iconColor: '#FACC15', link : '(stack)/sorting',
      image:require('../../../assets/images/gamescreens/odd.png') },
    { id: '1', title: 'Line Up the Numbers!', icon: 'images-outline', color: '#D8B5FF', iconColor: '#C084FC', link : '(stack)/sortnumbers',
      image:require('../../../assets/images/gamescreens/sort.png') },


  ];

  const handleGamePress = (game) => {
    router.push(game.link);
    // console.log(`${game.title} pressed`);
    // Navigate to the appropriate screen
  };

  // Game card renderer
  const renderGameCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.gameCard, { backgroundColor: item.color }]}
      onPress={() => handleGamePress(item)}
      activeOpacity={0.9}
    >
      {/* <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
        <Ionicons name={item.icon} size={24} color="white" />
      </View> */}
      <Image source={item.image} style={{ width: '100%', height: 80, borderRadius: 16 }} resizeMode='cover'/>
      <Text style={styles.gameTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Let's Play!</Text>
      
      <FlatList
        data={games}
        renderItem={renderGameCard}
        keyExtractor={(item) => item.id}
        horizontal={true} // This is correct
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gamesList}
        // The rest of your optimization props are fine
        initialNumToRender={4}
        windowSize={5}
        removeClippedSubviews={Platform.OS === 'android'}
        getItemLayout={(data, index) => ({
          length: 172,
          offset: 172 * index,
          index,
        })}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  gamesList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  gameCard: {
    width: 160,
    height: 160,
    borderRadius: 24,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});