import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { gameQuestions } from '../data/gameData';

export default function GameScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [sound, setSound] = useState();

  const currentQuestion = gameQuestions[currentQuestionIndex];

  async function playSound(isCorrectAnswer) {
    const soundFile = isCorrectAnswer ? currentQuestion.correctSound : currentQuestion.incorrectSound;
    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleAnswer = async (selectedOption) => {
    const isCorrectAnswer = selectedOption.name === currentQuestion.correctAnswer;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      setExplanation(currentQuestion.explanation);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await playSound(true);
    } else {
      setExplanation(currentQuestion.incorrectExplanation);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      await playSound(false);
    }
    setModalVisible(true);
  };

  const handleNextQuestion = () => {
    setModalVisible(false);
    const nextIndex = (currentQuestionIndex + 1) % gameQuestions.length;
    setCurrentQuestionIndex(nextIndex);
  };

  const handleTryAgain = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={currentQuestion.shadowImage} style={styles.shadowImage} />
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.bottomSection}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity key={option.id} onPress={() => handleAnswer(option)}>
            <Image source={option.image} style={styles.optionImage} />
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isCorrect ? 'Correct!' : 'Try Again!'}</Text>
            <Text style={styles.modalText}>{explanation}</Text>
            {isCorrect ? (
              <Button title="Next Question" onPress={handleNextQuestion} />
            ) : (
              <Button title="Try Again" onPress={handleTryAgain} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  shadowImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  optionImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
});