import React, { useEffect, useState } from 'react';
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
import { useRouter } from 'expo-router';
import { shortsData, videoListData } from '../../constants/data/videosData.js';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth * 0.5;

const checkInternet = async () => {
  try {
    const response = await fetch('https://www.google.com', { method: 'HEAD' });
    return response.ok;
  } catch (err) {
    return false;
  }
};

const HomeScreen = () => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(true);
  const [filteredShorts, setFilteredShorts] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const checkConnection = async () => {
      const result = await checkInternet();
      // const result = false; // Simulating offline mode for testing
      setIsConnected(result);
      
      const filteredVideos = result
        ? videoListData // show all videos when online
        : videoListData.filter((v) => !v.videoUrl?.toString().startsWith('http')); // show only offline-safe
      
      const filteredShorts = result
        ? shortsData
        : shortsData.filter((s) => !s.videoUrl?.toString().startsWith('http'));
      
      setFilteredVideos(filteredVideos);
      setFilteredShorts(filteredShorts);
    };

    checkConnection();
  }, []);

  const renderShortsItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.shortsCard}
      onPress={() => {
        router.push({
          pathname: 'reels',
          params: { initialIndex: index },
        });
      }}
    >
      <Image source={item.thumbnail} style={styles.shortsThumbnail} />
      <Text style={styles.shortsTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.shortsViews}>{item.views}</Text>
    </TouchableOpacity>
  );

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: 'socialStoriesVideos',
          params: { videoId: item.id },
        });
      }}
      style={styles.videoCard}
    >
      <Image source={item.thumbnail} style={styles.videoThumbnail} />
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
      <Text style={styles.sectionTitle}>Shorts</Text>
      {
        <FlatList
          data={filteredShorts}
          renderItem={renderShortsItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shortsList}
        />
      }

      <Text style={styles.sectionTitle}>Videos</Text>
      {
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.videoList}
        />
      }
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    marginBottom: 50,
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
    marginBottom: 10,
    marginTop: 5,
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
  offlineText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
