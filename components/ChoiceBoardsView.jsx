import { useState,useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image,Modal , Button} from 'react-native';
import { Card, Text, List, RadioButton } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import { loadSound,playSound } from '../utils/Sound';
import ConfettiCannon from 'react-native-confetti-cannon';

const ChoiceBoardsView = ({ data = []}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const currentItem = data[currentIndex];
  const [soundURIs, setSoundURIs] = useState({ correct: null, incorrect: null });
  
  const player = useAudioPlayer();

  // Effect to load sound assets when the question changes
  useEffect(() => {
    const loadSounds = async () => {
      try {
       await loadSound(currentItem.correctSound, currentItem.incorrectSound, setSoundURIs);
      } catch (error) {
        console.error("Failed to load game sounds:", error);
      }
    };

    if (currentItem) {
       loadSounds();
    }
  }, [currentIndex]); 

  

  const handleAnswer = async (questionId, value) => {
    const isCorrectVal = (value === currentItem.correctAnswer);
    await playSound(player, isCorrectVal ? soundURIs.correct.uri : soundURIs.incorrect.uri);
    setIsCorrect(isCorrectVal);
    setModalVisible(true);
  };
  const handleNextQuestion = () => {
      setModalVisible(false);
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      setExpanded(true);
      setIsCorrect(false);
  };
  
    const handleTryAgain = () => {
      setModalVisible(false);
    };

   if (!currentItem) {
      return (
        <View style={styles.container}>
          <Text>Loading Boards...</Text>
        </View>
      );
  }

  return (
    <View style={styles.container}>
      {isCorrect && modalVisible && (
         <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} autoStart={true} />
      </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Image
            source={currentItem.image}
            style={styles.image}
            resizeMode="cover"
          />
          <Card.Content>
            <Text variant="bodyLarge" style={styles.titleText}>
              {currentItem.title}
            </Text>
          </Card.Content>

          <List.Section>
            <List.Accordion
              title={currentItem.question}
              expanded={expanded}
              onPress={() => setExpanded(expanded => !expanded)}
              titleNumberOfLines={0}
              left={() => (
                <FontAwesome name="question-circle" size={20} style={styles.iconLeft} />
              )}
              right={() => (
                <FontAwesome
                  name={expanded ? 'angle-up' : 'angle-down'}
                  size={20}
                  style={styles.iconRight}
                />
              )}
              titleStyle={styles.accordionTitle}
              style={styles.accordion}
            >
              <RadioButton.Group
                onValueChange={value => handleAnswer(currentItem.id, value)}
              >
                {currentItem.options.map(opt => (
                  <RadioButton.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                    labelStyle={styles.radioLabel}
                    color="black"
                    uncheckedColor="black" 
                    style={styles.radioItem}
                  />
                ))}
              </RadioButton.Group>
            </List.Accordion>
          </List.Section>
        </Card>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{isCorrect ? '✅ Correct! Great job!' : '❌ Incorrect. Try again!'}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  scrollContent: {
    alignItems: 'center',
    padding: 16,
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
    color:"black"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '95%',
    borderRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleText: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  accordion: {
    backgroundColor: '#e4f0fa',
    marginTop: 10,
    padding: 4,
  },
  accordionTitle: {
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  iconLeft: {
    margin: 10,
    color: '#0f4c75',
  },
  iconRight: {
    marginRight: 10,
    color: '#0f4c75',
  },
  radioItem: {
    paddingHorizontal: 16,
  },
  radioLabel: {
    fontSize: 16,
    color:'black'
  },
  feedback: {
    marginHorizontal: 16,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 8,
    marginBottom: 20,
  },
});

export default ChoiceBoardsView;
