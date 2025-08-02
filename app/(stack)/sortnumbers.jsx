import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet, Modal, Image } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useStreak } from '../../hooks/steakContext';
import * as Haptics from 'expo-haptics';

const generateNumbers = () =>
  Array.from({ length: 5 }, (_, i) => ({
    key: String(i),
    number: Math.floor(Math.random() * 10) + 1,
  }));

export default function SortByDragGame() {
  const [data, setData] = useState(generateNumbers());
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

  const checkSorting = async () => {
    const nums = data.map((item) => item.number);
    const sorted = [...nums].sort((a, b) => a - b);
    const isSorted = nums.every((n, i) => n === sorted[i]);
    if (isSorted) {
      incrementPointsStreak(100);
      setIsGameOver(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    }
    else {
      incrementPointsStreak(50);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        '❌ Not Sorted',
        'Please try again and sort in ascending order.',
        [
          { text: 'OK' },
        ]
      );
    }
  };

  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.header}>Ascending Order</Text>

        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.key}
          renderItem={({ item, drag, isActive }) => (
            <Pressable
              onPressIn={drag}
              disabled={isActive}
              style={[
                styles.item,
                isActive && { backgroundColor: '#cce5ff', borderColor: '#66b0ff' },
              ]}
            >
              <Text style={styles.itemText}>{item.number}</Text>
            </Pressable>
          )}
        />

        <Pressable onPress={checkSorting} style={styles.button}>
          <Text style={styles.buttonText}>Check</Text>
        </Pressable>
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
                    setData(generateNumbers());
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#eee',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: { fontSize: 18, textAlign: 'center' },
  button: {
    marginTop: 24,
    backgroundColor: 'green',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    // color:"black"
  },
});
