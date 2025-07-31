import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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

  const handleDrop = (category) => {
    const item = numbers[0];
    if (!item) return;

    const isEven = item.number % 2 === 0;
    const isCorrect = (category === 'even' && isEven) || (category === 'odd' && !isEven);

    if (isCorrect) {
      setFlashColor('green');
      setTimeout(() => {
        setFlashColor(null);
        setScore((s) => s + 1);
        setNumbers((prev) => {
          const updated = prev.slice(1);
          if (updated.length === 0) {
            setTimeout(() => {
              Alert.alert(
                '🎉 Game Over',
                "You've sorted all numbers!",
                [
                  {
                    text: 'Restart',
                    onPress: () => {
                      setNumbers(generateNumbers());
                      setScore(0);
                    },
                  },
                ],
                { cancelable: false }
              );
            }, 200);
          }
          return updated;
        });
      }, 400);
    } else {
      setFlashColor('red');
      setTimeout(() => {
        setFlashColor(null);
        Alert.alert('❌ Incorrect', 'Try again!');
      }, 300);
    }
  };

  const currentNumber = numbers[0];

  let numberBoxColor = 'bg-blue-100 border-blue-500';
  if (flashColor === 'green') numberBoxColor = 'bg-green-200 border-green-500';
  if (flashColor === 'red') numberBoxColor = 'bg-red-200 border-red-500';

  return (
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
  );
}
