import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { videoListData } from '../../constants/data/videosData.js';

// Native fetch-based internet checker
const checkInternet = async () => {
  try {
    const res = await fetch('https://www.youtube.com', { method: 'HEAD' });
    return res.ok;
  } catch (err) {
    return false;
  }
};

const SocialStoriesVideos = () => {
  const router = useRouter();
  const { videoId } = useLocalSearchParams();

  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const handleData = async () => {
      const isConnected = await checkInternet();

      const availableVideos = isConnected
        ? videoListData
        : videoListData.filter(v => !v.videoUrl?.toString().startsWith('http'));

      setFilteredVideos(availableVideos);

      const index = availableVideos.findIndex(item => item.id === videoId);
      setCurrentVideo(index >= 0 ? availableVideos[index] : null);
    };

    handleData();
  }, [videoId]);

  // Initialize player only if video is valid
  const player = useVideoPlayer(currentVideo?.videoUrl, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  if (!currentVideo) {
    return (
      <View style={styles.errorContainer}>
      </View>
    );
  }

  const renderOtherVideo = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: 'socialStoriesVideos',
          params: { videoId: item.id },
        });
      }}
      style={styles.videoCard}
    >
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.videoDetails}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.videoMeta}>
          {item.channel} • {item.views} • {item.date}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Main Video */}
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          allowsFullscreen
          allowsPictureInPicture={false}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>{currentVideo.title}</Text>

      {/* Likes/Dislikes */}
      <View style={styles.likesContainer}>
        <TouchableOpacity
          style={styles.likesBox}
          onPress={() =>
            ToastAndroid.show('🌟 Thanks! We’ll find more good videos for you!🎉', ToastAndroid.LONG)
          }
        >
          <FontAwesome name="thumbs-up" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.likesBox}
          onPress={() =>
            ToastAndroid.show('👍Thanks! We’ll show different videos for you!🎥✨', ToastAndroid.LONG)
          }
        >
          <FontAwesome name="thumbs-down" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Other Videos */}
      <FlatList
        data={filteredVideos.filter((v) => v.id !== currentVideo.id)}
        renderItem={renderOtherVideo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoContainer: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#111' },
  video: { width: '100%', height: '100%' },
  title: { color: 'white', fontSize: 16, fontWeight: '600', marginTop: 8, marginHorizontal: 10 },
  likesContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  likesBox: { flexDirection: 'row', alignItems: 'center' },
  likesText: { color: '#fff', marginLeft: 4 },
  separator: { width: 1, backgroundColor: '#444', marginHorizontal: 10 },
  videoCard: { flexDirection: 'row', marginHorizontal: 10, marginBottom: 14 },
  thumbnail: { width: 120, height: 68, borderRadius: 6 },
  videoDetails: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  videoTitle: { color: 'white', fontSize: 14, fontWeight: '500' },
  videoMeta: { color: '#aaa', fontSize: 12, marginTop: 2 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  errorText: { color: 'white', fontSize: 16 },
});

export default SocialStoriesVideos;
