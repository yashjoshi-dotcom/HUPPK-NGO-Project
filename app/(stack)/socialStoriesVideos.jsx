import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { FlatList, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { videoListData } from '../data/videosData';



const SocialStoriesVideos = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { videoId } = route.params || {};
  const index = videoListData.findIndex((item) => item.id === videoId);
  const currentVideo = index >= 0 ? videoListData[index] : null;

  // Initialize player only if video is valid
  const player = useVideoPlayer(currentVideo?.videoUrl, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  if (!currentVideo) {
    console.warn('Video not found for ID:', videoId);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Video not found.</Text>
      </View>
    );
  }

  const renderOtherVideo = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('socialStoriesVideos', {
          videoId: item.id,
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
          onPress={() => ToastAndroid.show('🌟 Thanks! We’ll find more good videos for you!🎉', ToastAndroid.LONG)}
        >
          <FontAwesome name="thumbs-up" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.likesBox}
          onPress={() => ToastAndroid.show('👍Thanks! We’ll show different videos for you!🎥✨', ToastAndroid.LONG)}
        >
          <FontAwesome name="thumbs-down" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Other Videos */}
      <FlatList
        data={videoListData.filter((_, i) => i !== index)}
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
