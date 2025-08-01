// This file will store the questions, options, and answers for the game.

export const gameQuestions = [
  {
    id: 1,
    question: 'Which is a herbivorous animal?',
    options: [
      { id: 'a', name: 'Lion', image: require('../../assets/images/games/lion.jpg') },
      { id: 'b', name: 'Cow', image: require('../../assets/images/games/cow.png') },
      { id: 'c', name: 'Dog', image: require('../../assets/images/games/dog.png') },
    ],
    correctAnswer: 'Cow',
    shadowImage: require('../../assets/images/games/cow_shadow.webp'),
    explanation: 'Correct! The cow is a herbivore, which means it primarily eats plants.',
    incorrectExplanation: 'Not quite. Lions and dogs are carnivores or omnivores, not herbivores.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
  },
  {
    id: 2,
    question: 'Which animal is known as the "King of the Jungle"?',
    options: [
        { id: 'a', name: 'Dog', image: require('../../assets/images/games/dog.png') },
        { id: 'b', name: 'Cow', image: require('../../assets/images/games/cow.png') },
        { id: 'c', name: 'Lion', image: require('../../assets/images/games/lion.jpg') },
    ],
    correctAnswer: 'Lion',
    shadowImage: require('../../assets/images/games/lion.jpg'), // Placeholder
    explanation: 'Correct! The lion is famously called the "King of the Jungle."',
    incorrectExplanation: 'Not quite. While strong, the cow and dog are not known as the king.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
  },
// TODO (yash): Add more questions here.
];

export default { gameQuestions };
