import React, { useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';

const slides = Array.from({ length: 10 }).map((_, index) => ({
  key: index.toString(),
  title: `Slide ${index + 1}`,
  image: `https://picsum.photos/seed/${index + 1}/375/576`,
}));

export default function CarouselPage() {
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = Animated.divide(scrollX, width);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((item, index) => (
          <View key={index} style={[styles.slide, { width, height }]}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pageIndicator}>
        <PageIndicator count={slides.length} current={animatedCurrent} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    marginBottom: 10, // Adjust as needed
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 375,
    height: 576,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 16,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pageIndicator: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
