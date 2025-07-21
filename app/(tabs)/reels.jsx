import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { shortsData } from './videosData.js';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const { height, width } = Dimensions.get('window');

const ReelsScreen = () => {
  const route = useRoute();
  const initialIndex = route.params?.initialIndex || 0;
  console.log('Initial index from route:', initialIndex);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [pausedStates, setPausedStates] = useState(shortsData.map(() => false));
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const carouselRef = useRef(null);


  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, handling initialIndex:', initialIndex);

      if (carouselRef.current) {
        carouselRef.current.scrollTo({ index: initialIndex, animated: false });
      }

      handleSnapToItem(initialIndex);

      return () => {
        console.log('Screen unfocused, pausing all videos');
        videoRefs.current.forEach((video) => {
          if (video) video.pauseAsync();
        });
      };
    }, [initialIndex])
  );

  const handlePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    console.log(`Tapped video index: ${index}`);

    if (pausedStates[index]) {
      video.playAsync();
      setShowPauseIcon(false);
    } else {
      video.pauseAsync();
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 1000);
    }

    setPausedStates((prev) =>
      prev.map((paused, i) => (i === index ? !paused : paused))
    );
  };

  const handleSnapToItem = (index) => {
    console.log('Snapped to index:', index);
    setCurrentIndex(index);
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.playAsync();
        } else {
          video.pauseAsync();
        }
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
        renderItem={({ item, index }) => (
          <TouchableWithoutFeedback onPress={() => handlePlayPause(index)}>
            <View style={styles.videoContainer}>
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: item.videoUrl }}
                style={styles.video}
                resizeMode="cover"
                isLooping
                shouldPlay={index === currentIndex}
                useNativeControls={false}
              />

              {/* Pause icon overlay */}
              {pausedStates[index] && index === currentIndex && showPauseIcon && (
                <View style={styles.pauseIconContainer}>
                  <FontAwesome name="pause-circle" size={80} color="rgba(255,255,255,0.85)" />
                </View>
              )}

              {/* Like / Dislike icons */}
              <View style={styles.likeDislikeContainer}>
                <View style={styles.iconCircle}>
                  <FontAwesome name="thumbs-up" size={24} color="white" />
                </View>
                <Text style={styles.iconText}>28K</Text>
                <View style={[styles.iconCircle, { marginTop: 16 }]}>
                  <FontAwesome name="thumbs-down" size={24} color="white" />
                </View>
                <Text style={styles.iconText}>Dislike</Text>
              </View>

              {/* Video title */}
              <View style={styles.titleContainer}>
                <View style={styles.titleBackground}>
                  <FontAwesome name="music" size={16} color="white" style={{ marginRight: 6 }} />
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
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
    bottom: 230,
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
    bottom: 130,
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
});
