import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Modal, Pressable } from 'react-native';
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
import { useStreak } from '../../hooks/steakContext';

const data = ClassifyData;

// [unchanged imports and data array]

export default function ClassifyScreen() {
  const [current, setCurrent] = useState(0);
  //const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const { incrementPointsStreak } = useStreak();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const topZoneScale = useSharedValue(1);
  const bottomZoneScale = useSharedValue(1);
  const backgroundColor = useSharedValue('white');

  const CARD_HEIGHT = 220;
  const THRESHOLD = 100;
  const handleTryAgain = () => {
    setCurrent(0);
    //setScore(0);
    setIsGameOver(false);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    topZoneScale.value = withSpring(1);
    bottomZoneScale.value = withSpring(1);
    backgroundColor.value = 'white';
  }
  const CorrectAnswerResponse = ({ points }) => {
    return (
      <View className="text-yellow-600">
        <View className="flex flex-row items-center justify-center mb-4">
          <Text className="text-4xl font-bold text-red-600" style={{ color: "black" }}> + {points}</Text>
          <View className="w-10 h-10" >
            <Image
              source={require('../../assets/images/coins.png')}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text className="text-xl " style={{ color: "black" }}>Correct! You earned {points} points</Text>
      </View>
    )
  }

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
      if (current === data.length - 1) {
        incrementPointsStreak(100);
        setIsGameOver(true);
      }
      else {
        //runOnJS(setScore)((s) => s + 1);
        runOnJS(setCurrent)((i) => (i + 1) % data.length);
      }
    } else if (cardBottom > THRESHOLD && item.type === 'fruit' && isBottomZoneActive) {
      flashColor('lightgreen');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (current === data.length - 1) {
        incrementPointsStreak(100);
        setIsGameOver(true);
      }
      else {
        //runOnJS(setScore)((s) => s + 1);
        runOnJS(setCurrent)((i) => (i + 1) % data.length);
      }
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
        <Text style={{ fontSize: 24 }}>Loading Game........</Text>
      </View>
    );
  }

  return (
    <>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        {/* <Text style={styles.score}>Score: {score}</Text> */}

        <Animated.View style={[styles.dropZone, animatedTopZoneStyle, { backgroundColor: 'rgba(0,255,0,0.15)', borderColor: 'green' }]}>
          <Text style={styles.zoneLabel}>🥦 Vegetable</Text>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, animatedCardStyle]}>
            <Card>
              <Card.Title  titleStyle={{ fontSize: 24 }} title={item.name} />
              <Image source={item.image} style={styles.image} resizeMode='contain' />
            </Card>
          </Animated.View>
        </GestureDetector>

        <Animated.View style={[styles.dropZone, animatedBottomZoneStyle, { backgroundColor: 'rgba(0,0,255,0.15)', borderColor: 'blue' }]}>
          <Text style={styles.zoneLabel}>🍎 Fruit</Text>
        </Animated.View>
       
      </Animated.View>
      {isGameOver && (
        <View className="flex-1 bg-white text-black-500">
          <Modal
          animationType="slide"
          transparent={true}
          visible={isGameOver}
          onRequestClose={() => setIsGameOver(false)}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-2xl p-6 w-72 items-center">
              <Text style={styles.modalTitle}>{isGameOver ? <CorrectAnswerResponse points={100} /> : ''}</Text>
              <Text className="text-lg text-black-500 font-bold text-center mb-4" style={{ color: "black" }}>
                🎉 Correct! Great job!
              </Text>
              <Pressable
                onPress={() => handleTryAgain()}
                className='bg-green-600 px-6 py-3 rounded-lg'>
                <Text className="text-white font-bold" style={{ textAlign: 'center' }}>
                  Restart
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    // color:"black"
  },
});
