import { useState, useEffect } from 'react';
import { View, ScrollView, Image, Modal, Pressable,StyleSheet } from 'react-native';
import { Card, Text, List, RadioButton } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { loadSound, playSound } from '../utils/Sound';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useStreak } from '../hooks/steakContext';

const ChoiceBoardsView = ({ data = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [soundURIs, setSoundURIs] = useState({ correct: null, incorrect: null });
  const {incrementPointsStreak}=useStreak();

  const currentItem = data[currentIndex];
  const player = useAudioPlayer();

  useEffect(() => {
    const loadSounds = async () => {
      try {
        await loadSound(currentItem.correctSound, currentItem.incorrectSound, setSoundURIs);
      } catch (error) {
        console.error("Failed to load game sounds:", error);
      }
    };
    if (currentItem) loadSounds();
  }, [currentIndex]);
   const CorrectAnswerResponse = ({points}) => {
    return (
      <View className="text-yellow-600">
        <View className="flex flex-row items-center justify-center mb-4">
        <Text className="text-4xl font-bold text-red-600" style={{color:"black"}}> + {points}</Text>
        <View className="w-10 h-10" >
        <Image
          source={require('../assets/images/coins.png')}
          style={{ width: "100%", height: "100%"}}
          resizeMode="contain"
          />
          </View>
        </View>
        <Text className="text-xl " style={{color:"black"}}>Correct! You earned {points} points</Text>
      </View>
    )
  }

  const handleAnswer = async (questionId, value) => {
    const isCorrectVal = value === currentItem.correctAnswer;
    const soundURI = isCorrectVal ? soundURIs.correct?.uri : soundURIs.incorrect?.uri;
    setIsCorrect(isCorrectVal);
    setModalVisible(true);
    incrementPointsStreak((isCorrectVal ? currentItem.points : 0));
    if (soundURI) await playSound(player, soundURI);
  };

  const handleNextQuestion = () => {
    setModalVisible(false);
    const nextIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(nextIndex);
    setExpanded(true);
    setIsCorrect(false);
  };

  const handlePrevQuestion = () => {
    setModalVisible(false);
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(prevIndex);
    setExpanded(true);
    setIsCorrect(false);
  };

  const handleTryAgain = () => setModalVisible(false);

  if (!currentItem) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading Boards...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white text-black-500">
      {isCorrect && modalVisible && (
        <View className="absolute inset-0 z-10">
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} autoStart />
        </View>
      )}

      <ScrollView contentContainerStyle={{ alignItems: 'center' }} className="p-4">
        <View className="w-[95%] bg-white rounded-3xl shadow-md">
          <View className="w-full h-56 rounded-t-3xl overflow-hidden">
            <Image
              source={currentItem.image}
              resizeMode={currentItem.resize}
              className="w-full h-full"
            />
          </View>

          <View className="px-4 py-3">
            <Text className="text-lg font-bold text-black-500 mb-2" style={{color:"black"}}>
              {currentItem.title}
            </Text>
          </View>

          <List.Section>
            <List.Accordion
              title={currentItem.question}
              expanded={expanded}
              onPress={() => setExpanded(prev => !prev)}
              titleNumberOfLines={0}
              left={() => (
                <FontAwesome name="question-circle" size={20} color="#388e3c" className="ml-2" />
              )}
              right={() => (
                <FontAwesome
                  name={expanded ? 'angle-up' : 'angle-down'}
                  size={20}
                  color="#388e3c"
                  className="mr-2"
                />
              )}
              titleStyle={{ fontWeight: 'bold', color: '#2c3e50' }}
              style={{ backgroundColor: '#e0f7e9' }}
            >
              <RadioButton.Group onValueChange={val => handleAnswer(currentItem.id, val)}>
                {currentItem.options.map(opt => (
                  <RadioButton.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    labelStyle={{ fontSize: 16, color: '#2c3e50' }}
                    color="#2e7d32"
                    uncheckedColor="#888"
                    style={{ paddingHorizontal: 16 }}
                  />
                ))}
              </RadioButton.Group>
            </List.Accordion>
          </List.Section>
        </View>

        <View className="flex-row justify-between w-full px-6 mt-6">
          <Pressable onPress={handlePrevQuestion} className="bg-red-500 px-4 py-3 rounded-xl">
            <Text className="text-white font-bold">⏮ Previous</Text>
          </Pressable>

          <Pressable onPress={handleNextQuestion} className="bg-green-500 px-4 py-3 rounded-xl">
            <Text className="text-white font-bold">Next ⏭</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-72 items-center">
            <Text style={styles.modalTitle}>{isCorrect ? <CorrectAnswerResponse points={currentItem.points} /> : ''}</Text>
            <Text className="text-lg text-black-500 font-bold text-center mb-4" style={{color:"black"}}>
              {isCorrect ? '🎉 Correct! Great job!' : '❌ That’s not right. Try again!'}
            </Text>
            <Pressable
              onPress={isCorrect ? handleNextQuestion : handleTryAgain}
              className={isCorrect ? 'bg-green-600 px-6 py-3 rounded-lg' : 'bg-red-700 px-6 py-3 rounded-lg'}>
              <Text className="text-white font-bold" style={{ textAlign: 'center' }}>
                {isCorrect ? 'Next Question' : 'Try Again'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChoiceBoardsView;
const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    // color:"black"
  },
})
