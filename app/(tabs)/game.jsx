import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { Asset } from 'expo-asset';
import { gameQuestions } from '../data/gameData';
import ConfettiCannon from 'react-native-confetti-cannon';

export default function GameScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  
  // State to hold the resolved sound URIs
  const [soundURIs, setSoundURIs] = useState({ correct: null, incorrect: null });

  const player = useAudioPlayer();
  const currentQuestion = gameQuestions[currentQuestionIndex];

  // Effect to load sound assets when the question changes
  useEffect(() => {
    const loadSounds = async () => {
      try {
        const correctAsset = Asset.fromModule(currentQuestion.correctSound);
        const incorrectAsset = Asset.fromModule(currentQuestion.incorrectSound);

        await Promise.all([correctAsset.downloadAsync(), incorrectAsset.downloadAsync()]);

        setSoundURIs({
          correct: correctAsset.uri,
          incorrect: incorrectAsset.uri,
        });
      } catch (error) {
        console.error("Failed to load game sounds:", error);
      }
    };

    if (currentQuestion) {
      loadSounds();
    }
  }, [currentQuestionIndex]); // Re-run this effect when the question changes

  async function playSound(isCorrectAnswer) {
    const soundURI = isCorrectAnswer ? soundURIs.correct : soundURIs.incorrect;

    if (!soundURI || !player) {
      console.log("Sound URI or player not ready.");
      return;
    }

    try {
      player.replace(soundURI); // <-- FIX: Use the resolved URI string
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
    setSelectedId(null);
    const nextIndex = (currentQuestionIndex + 1) % gameQuestions.length;
    setCurrentQuestionIndex(nextIndex);
  };

  const handleTryAgain = () => {
    setModalVisible(false);
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
        <Image source={currentQuestion.shadowImage} style={styles.shadowImage} resizeMode="contain" />
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
              selectedId === option.id && {
                borderColor: isCorrect ? 'green' : 'red',
                borderWidth: 4,
              }
            ]}
          >
            <Image source={option.image} style={styles.optionImage} resizeMode="contain" />
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
    padding: 5,
    backgroundColor: 'white',
  },
  optionImage: {
    width: 100,
    height: 100,
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