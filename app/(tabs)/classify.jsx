import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS as workletRunOnJS
} from 'react-native-reanimated';
import { Card } from 'react-native-paper';

const data = [
  { name: 'Apple', type: 'fruit', image: require('../../assets/images/games/apple.jpg') },
  { name: 'Carrot', type: 'vegetable', image: require('../../assets/images/games/carrot.jpg') },
  { name: 'Banana', type: 'fruit', image: require('../../assets/images/games/banana.jpg') },
];

export default function ClassifyScreen() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const rootRef = useRef(null);
  const fruitRef = useRef(null);
  const vegRef = useRef(null);

  const dropZones = useRef({
    fruit: null,
    vegetable: null,
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const measureZone = (ref, key) => {
    ref.current?.measureLayout(
      rootRef.current,
      (x, y, width, height) => {
        dropZones.current[key] = { x, y, width, height };
      },
      () => {}
    );
  };

  const measureDropZones = () => {
    measureZone(vegRef, 'vegetable');
    measureZone(fruitRef, 'fruit');
  };

  const isInside = (drop, x, y) => {
    if (!drop) return false;
    return (
      x >= drop.x &&
      x <= drop.x + drop.width &&
      y >= drop.y &&
      y <= drop.y + drop.height
    );
  };

  const handleDrop = async(gestureX, gestureY) => {
    const item = data[current];

    const fruitZone = dropZones.current.fruit;
    const vegZone = dropZones.current.vegetable;

    if (isInside(fruitZone, gestureX, gestureY) && (item.type === 'fruit')) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((s) => s + 1);
      setCurrent((i) => (i + 1) % data.length);
      
    } else if (isInside(vegZone, gestureX, gestureY) && (item.type === 'vegetable')) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((s) => s + 1);
      setCurrent((i) => (i + 1) % data.length);
    } else {
      // Drop missed all zones — optional feedback
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      console.warn('Dropped outside zones');
    }
  };

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      workletRunOnJS(measureDropZones)();
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((e) => {
      workletRunOnJS(handleDrop)(e.absoluteX, e.absoluteY);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
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
    <View style={styles.container} ref={rootRef}>
      <Text style={styles.score}>Score: {score}</Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Card>
            <Card.Title title={item.name} />
            <Card.Content>
              <Image source={item.image} style={styles.image} />
            </Card.Content>
          </Card>
        </Animated.View>
      </GestureDetector>

      <View style={styles.zones}>
        <View style={styles.zone} ref={vegRef}>
          <Text style={styles.label}>Vegetable Bin</Text>
        </View>
        <View style={styles.zone} ref={fruitRef}>
          <Text style={styles.label}>Fruit Bin</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 80, alignItems: 'center' },
  score: { fontSize: 20, marginBottom: 20 },
  card: { width: 200, height: 220, marginBottom: 20 },
  image: { width: 100, height: 100, alignSelf: 'center' },
  zones: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
  },
  zone: {
    width: 130,
    height: 130,
    borderWidth: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  label: { fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
