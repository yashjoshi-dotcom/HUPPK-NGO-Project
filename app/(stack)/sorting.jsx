import React, { useState } from 'react';
import { View, Text, Pressable, Alert, Modal, StyleSheet, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useStreak } from '../../hooks/steakContext';
const generateNumbers = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i),
    number: Math.floor(Math.random() * 50) + 1, // Random number between 1 and 50
  }));
};

export default function NumberSortingGame() {
  const [numbers, setNumbers] = useState(generateNumbers());
  const [score, setScore] = useState(0);
  const [flashColor, setFlashColor] = useState(null); // 'green' | 'red' | null
  const { incrementPointsStreak } = useStreak();
  const [isGameOver, setIsGameOver] = useState(false);
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

  const handleDrop = async (category) => {
    const item = numbers[0];
    if (!item) return;

    const isEven = item.number % 2 === 0;
    const isCorrect = (category === 'even' && isEven) || (category === 'odd' && !isEven);

    if (isCorrect) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setFlashColor('green');
      if (numbers.length === 1) {
        incrementPointsStreak(100);
        setIsGameOver(true);
      }
      setTimeout(() => {
        setFlashColor(null);
        if (numbers.length > 1) {
          setNumbers((prev) => {
            const updated = prev.slice(1);
            return updated;
          });
        }
      }, 600)
      setScore((s) => s + 1);
    } else {
      setFlashColor('red');
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => {
        setFlashColor(null);
        Alert.alert('❌ Incorrect', 'Try again!');
      }, 600);
    }
  };

  const currentNumber = numbers[0];

  let numberBoxColor = 'bg-blue-100 border-blue-500';
  if (flashColor === 'green') numberBoxColor = 'bg-green-200 border-green-500';
  if (flashColor === 'red') numberBoxColor = 'bg-red-200 border-red-500';

  return (
    <>
      <GestureHandlerRootView className="flex-1 bg-white">
        <View className="flex-1 px-4 pt-12 pb-4 justify-start">
          <Text className="text-2xl font-bold text-center mb-6">Score: {score}</Text>

          {/* Show only one number */}
          {currentNumber && (
            <View className={`p-6 mb-6 rounded-lg border ${numberBoxColor}`}>
              <Text className="text-center text-3xl font-bold">{currentNumber.number}</Text>
            </View>
          )}

          {/* Even / Odd buttons */}
          <View className="flex-row justify-around mt-6">
            <Pressable
              className="bg-green-300 px-6 py-4 rounded-xl items-center"
              onPress={() => handleDrop('even')}
            >
              <Text className="text-3xl font-semibold">Even Bin</Text>
            </Pressable>

            <Pressable
              className="bg-red-300 px-6 py-4 rounded-xl items-center"
              onPress={() => handleDrop('odd')}
            >
              <Text className="text-3xl font-semibold">Odd Bin</Text>
            </Pressable>
          </View>
        </View>
      </GestureHandlerRootView>
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
                  onPress={() => {
                    setIsGameOver(false);
                    setNumbers(generateNumbers());
                  }}
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
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    // color:"black"
  },
})
