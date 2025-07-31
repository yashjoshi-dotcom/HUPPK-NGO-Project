import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from 'react-native-reanimated';
import { Card } from 'react-native-paper';
import { ClassifyData } from '../../constants/Classify';

const data = ClassifyData;

// [unchanged imports and data array]

export default function ClassifyScreen() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const topZoneScale = useSharedValue(1);
  const bottomZoneScale = useSharedValue(1);
  const backgroundColor = useSharedValue('white');

  const CARD_HEIGHT = 220;
  const THRESHOLD = 150;

  const flashColor = (color) => {
    backgroundColor.value = color;
    setTimeout(() => {
      backgroundColor.value = 'white';
    }, 1000);
  };

  const handleSwipe = async () => {
    const item = data[current];
    const cardTop = translateY.value - CARD_HEIGHT / 2;
    const cardBottom = translateY.value + CARD_HEIGHT / 2;

    const isTopZoneActive = topZoneScale.value > 1.1;
    const isBottomZoneActive = bottomZoneScale.value > 1.1;

    if (cardTop < -THRESHOLD && item.type === 'vegetable' && isTopZoneActive) {
      flashColor('lightgreen');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      runOnJS(setScore)((s) => s + 1);
      runOnJS(setCurrent)((i) => (i + 1) % data.length);
    } else if (cardBottom > THRESHOLD && item.type === 'fruit' && isBottomZoneActive) {
      flashColor('lightgreen');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      runOnJS(setScore)((s) => s + 1);
      runOnJS(setCurrent)((i) => (i + 1) % data.length);
    } else {
      flashColor('lightcoral');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    topZoneScale.value = withSpring(1);
    bottomZoneScale.value = withSpring(1);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;

      const top = e.translationY - CARD_HEIGHT / 2;
      const bottom = e.translationY + CARD_HEIGHT / 2;

      topZoneScale.value = withSpring(top < -THRESHOLD ? 1.2 : 1);
      bottomZoneScale.value = withSpring(bottom > THRESHOLD ? 1.2 : 1);
    })
    .onEnd(() => {
      runOnJS(handleSwipe)();
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    opacity: 1 - Math.min(Math.abs(translateY.value) / 300, 0.5),
  }));

  const animatedTopZoneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: topZoneScale.value }],
  }));

  const animatedBottomZoneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bottomZoneScale.value }],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const item = data[current];
  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 24 }}>Game Over</Text>
        <Text style={{ fontSize: 18 }}>Score: {score}</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Text style={styles.score}>Score: {score}</Text>

      <Animated.View style={[styles.dropZone, animatedTopZoneStyle, { backgroundColor: 'rgba(0,255,0,0.15)', borderColor: 'green' }]}>
        <Text style={styles.zoneLabel}>🥦 Vegetable</Text>
      </Animated.View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <Card>
            <Card.Title title={item.name} />
            <Image source={item.image} style={styles.image} />
          </Card>
        </Animated.View>
      </GestureDetector>

      <Animated.View style={[styles.dropZone, animatedBottomZoneStyle, { backgroundColor: 'rgba(0,0,255,0.15)', borderColor: 'blue' }]}>
        <Text style={styles.zoneLabel}>🍎 Fruit</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  score: {
    fontSize: 20,
  },
  card: {
    width: 200,
    height: 'fit-content',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZone: {
    height: 100,
    width: 220,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
