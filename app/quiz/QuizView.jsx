import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, RadioButton, Button } from 'react-native-paper';

const QuizComponent = () => {
  const question = {
    text: 'Which of the following is a fruit?',
    choices: ['Carrot', 'Apple', 'Broccoli', 'Potato'],
    correctAnswer: 'Apple',
  };

  const [selected, setSelected] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Quiz Question" />
      <Card.Content>
        <Text style={styles.question}>{question.text}</Text>
        <RadioButton.Group onValueChange={setSelected} value={selected}>
          {question.choices.map((choice, index) => (
            <RadioButton.Item
              key={index}
              label={choice}
              value={choice}
              disabled={submitted}
              color={submitted && choice === question.correctAnswer ? 'green' : undefined}
            />
          ))}
        </RadioButton.Group>
        {!submitted ? (
          <Button mode="contained" onPress={handleSubmit} disabled={!selected}>
            Submit
          </Button>
        ) : (
          <Text style={styles.result}>
            {selected === question.correctAnswer ? 'Correct!' : 'Incorrect. Try again!'}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 20 },
  question: { marginBottom: 10, fontSize: 16 },
  result: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default QuizComponent;
