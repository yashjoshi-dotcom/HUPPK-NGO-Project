import React, { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const generateNumbers = () =>
  Array.from({ length: 5 }, (_, i) => ({
    key: String(i),
    number: Math.floor(Math.random() * 10) + 1,
  }));

export default function SortByDragGame() {
  const [data, setData] = useState(generateNumbers());

  const checkSorting = () => {
    const nums = data.map((item) => item.number);
    const sorted = [...nums].sort((a, b) => a - b);
    const isSorted = nums.every((n, i) => n === sorted[i]);

    Alert.alert(
      isSorted ? '🎉 Correct!' : '❌ Not Sorted',
      isSorted
        ? 'You sorted the numbers correctly!'
        : 'Please try again and sort in ascending order.',
      [
        {
          text: 'Restart',
          onPress: () => setData(generateNumbers()),
        },
        { text: 'OK' },
      ]
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.header}>Sort Numbers</Text>

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
});
