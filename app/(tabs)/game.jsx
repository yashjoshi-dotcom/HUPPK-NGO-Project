import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { gameQuestions } from '../data/gameData';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function GameScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  
  const [selectedId, setSelectedId] = useState(null);

  const player = useAudioPlayer();
  const currentQuestion = gameQuestions[currentQuestionIndex];

  async function playSound(isCorrectAnswer) {
    const soundFile = isCorrectAnswer
      ? currentQuestion.correctSound
      : currentQuestion.incorrectSound;
    try {
      player.replace(soundFile);
      await player.play();
    } catch (error) {
      console.error("Error playing game sound:", error);
    }
  }

  const handleAnswer = async (selectedOption) => {
    setSelectedId(selectedOption.id); 

    const isCorrectAnswer = selectedOption.name === currentQuestion.correctAnswer;
    setIsCorrect(isCorrectAnswer);
    setExplanation(isCorrectAnswer ? currentQuestion.explanation : currentQuestion.incorrectExplanation);

    if (isCorrectAnswer) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    
    await playSound(isCorrectAnswer);
    setModalVisible(true);
  };

  const handleNextQuestion = () => {
    setModalVisible(false);
    // Reset the selection for the new question
    setSelectedId(null); 
    const nextIndex = (currentQuestionIndex + 1) % gameQuestions.length;
    setCurrentQuestionIndex(nextIndex);
  };

  const handleTryAgain = () => {
    setModalVisible(false);
    // Reset the selection so the user can pick again
    setSelectedId(null); 
  };

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text>Loading Questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCorrect && modalVisible && (
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={true} />
      )}

      <View style={styles.topSection}>
        <Image source={currentQuestion.shadowImage} style={styles.shadowImage} />
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.bottomSection}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity 
            key={option.id} 
            onPress={() => handleAnswer(option)}
            style={[
              styles.optionContainer,
              // Only apply border if an answer has been selected
              selectedId === option.id && {
                borderColor: isCorrect ? 'green' : 'red',
                borderWidth: 4,
              }
            ]}
          >
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
  optionContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    padding: 5, // Add some padding so the border doesn't crowd the image
    backgroundColor: 'white', // Give it a solid background
  },
  optionImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
