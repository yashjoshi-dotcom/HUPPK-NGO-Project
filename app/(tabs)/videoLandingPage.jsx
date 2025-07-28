import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { shortsData, videoListData } from './videosData.js'; 

const screenWidth = Dimensions.get('window').width;


const CARD_WIDTH = screenWidth * 0.5;

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderShortsItem = ({ item, index }) => (
     // 👈 Log item and index
    <TouchableOpacity
      style={styles.shortsCard}
      onPress={() => {
        console.log(item, index);
        navigation.navigate('reels', {
          initialIndex: index, // 👈 Pass index
        });
      }}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.shortsThumbnail} />
      <Text style={styles.shortsTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.shortsViews}>{item.views}</Text>
    </TouchableOpacity>
  );

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Video pressed:', item.id);
        navigation.navigate('socialStoriesVideos', {
          videoId: item.id, // Pass ID or full object
        });
      }}
      style={styles.videoCard}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <View style={styles.videoDetails}>
        <Image
          source={{ uri: 'https://i.imgur.com/tGbaZCY.jpg' }}
          style={styles.channelIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.videoMeta}>
            {item.channel} • {item.views} • {item.date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  

  return (
    <ScrollView style={styles.container}>
      {/* Shorts Section */}
      <Text style={styles.sectionTitle}>Shorts</Text>
      <FlatList
        data={shortsData}
        renderItem={renderShortsItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortsList}
      />

      {/* Video Feed Section */}
      <FlatList
        data={videoListData}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false} // disable nested scroll
        contentContainerStyle={styles.videoList}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 12,
  },
  shortsList: {
    paddingHorizontal: 8,
  },
  shortsCard: {
    width: CARD_WIDTH,
    marginRight: 12,
  },
  shortsThumbnail: {
    width: 190,
    height: 320,
    borderRadius: 10,
  },
  shortsTitle: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  shortsViews: {
    color: '#aaa',
    fontSize: 12,
  },
  videoList: {
    paddingBottom: 20,
  },
  videoCard: {
    marginBottom: 18,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
  },
  videoDetails: {
    flexDirection: 'row',
    padding: 8,
  },
  channelIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  videoTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  videoMeta: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
});
