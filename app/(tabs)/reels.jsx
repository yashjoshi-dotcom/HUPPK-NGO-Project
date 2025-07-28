import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEvent } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { shortsData } from './videosData.js';

const { height, width } = Dimensions.get('window');

const ReelsScreen = () => {
  const route = useRoute();
  const initialIndex = route.params?.initialIndex || 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [pausedStates, setPausedStates] = useState(shortsData.map(() => false));
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const carouselRef = useRef(null);

  // Create players for all videos
  const players = shortsData.map((item, i) =>
    useVideoPlayer(item.videoUrl, (player) => {
      player.loop = true;
      if (i === initialIndex) player.play();
    })
  );

  useFocusEffect(
    useCallback(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ index: initialIndex, animated: false });
      }
      handleSnapToItem(initialIndex);

      return () => {
        players.forEach((player) => player.pause());
      };
    }, [initialIndex])
  );

  const handlePlayPause = (index) => {
    const player = players[index];
    if (!player) return;

    if (pausedStates[index]) {
      player.play();
      setShowPauseIcon(false);
    } else {
      player.pause();
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 1000);
    }

    setPausedStates((prev) =>
      prev.map((paused, i) => (i === index ? !paused : paused))
    );
  };

  const handleSnapToItem = (index) => {
    setCurrentIndex(index);
    players.forEach((player, i) => {
      if (i === index) {
        player.play();
      } else {
        player.pause();
      }
    });
    setPausedStates((prev) =>
      prev.map((_, i) => (i === index ? false : prev[i]))
    );
    setShowPauseIcon(false);
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        vertical
        height={height}
        width={width}
        data={shortsData}
        pagingEnabled
        loop={true}
        defaultIndex={initialIndex}
        onSnapToItem={handleSnapToItem}
        renderItem={({ item, index }) => {
          const player = players[index];
          const { isPlaying } = useEvent(player, 'playingChange', {
            isPlaying: player.playing,
          });

          return (
            <TouchableWithoutFeedback onPress={() => handlePlayPause(index)}>
              <View style={styles.videoContainer}>
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen={false}
                  allowsPictureInPicture={false}
                  nativeControls={false}
                />

                {pausedStates[index] && index === currentIndex && showPauseIcon && (
                  <View style={styles.pauseIconContainer}>
                    <FontAwesome name="pause-circle" size={80} color="rgba(255,255,255,0.85)" />
                  </View>
                )}

                <View style={styles.likeDislikeContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      ToastAndroid.show('🌟 Thanks! We’ll find more good videos for you! 🎉', ToastAndroid.LONG)
                    }
                    style={styles.iconWrapper}
                  >
                    <View style={styles.iconCircle}>
                      <FontAwesome name="thumbs-up" size={24} color="white" />
                    </View>
                    <Text style={styles.iconText}>Like</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      ToastAndroid.show('👍 Thanks! We’ll show different videos for you! 🎥✨', ToastAndroid.LONG)
                    }
                    style={[styles.iconWrapper, { marginTop: 24 }]}
                  >
                    <View style={styles.iconCircle}>
                      <FontAwesome name="thumbs-down" size={24} color="white" />
                    </View>
                    <Text style={styles.iconText}>Dislike</Text>
                  </TouchableOpacity>
                </View>



                <View style={styles.titleContainer}>
                  <View style={styles.titleBackground}>
                    <FontAwesome name="music" size={16} color="white" style={{ marginRight: 6 }} />
                    <Text style={styles.titleText}>{item.title}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    </View>
  );
};

export default ReelsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
    width,
    height,
    marginBottom: 110, // Add some space at the bottom
  },
  video: {
    width: '100%',
    height: '100%',
  },
  pauseIconContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  likeDislikeContainer: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  titleBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  titleText: {
    color: 'white',
    fontSize: 16,
  },
  iconWrapper: {
    alignItems: 'center',
  },  
});
