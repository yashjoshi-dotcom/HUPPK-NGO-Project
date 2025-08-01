export const quizData = [
  {
    id: 'q1',
    image: require('../assets/images/choiceBoards/summer-cloth.jpg'),
    title: 'We should wear t-shirts in summer to stay cool and comfortable.',
    description: 'Test your knowledge about nature!',
    question: 'What clothes do we wear in summer?',
    options: [
      { label: 'Sweaters', value: 'sweaters' },
      { label: 'T-Shirts', value: 'tshirts' },
      { label: 'Shorts', value: 'shorts' },
      { label: 'Light Jackets', value: 'light_jackets' },
    ],
    correctAnswer: 'tshirts',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    points: 10,
  },
  {
    id: 'q2',
    image: require('../assets/images/choiceBoards/summer-cloth.jpg'),
    title: 'A girl is holding an umbrella while standing in the rain.',
    description: 'Learn about the animal kingdom!',
    question: 'What do we use when it rains?',
    options: [
      { label: 'Umbrella', value: 'Umbrella' },
      { label: 'Sunglasses', value: 'Sunglasses' },
      { label: 'Cap', value: 'Cap' },
      { label: 'Food', value: 'Food' },
    ],
    correctAnswer: 'Umbrella',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    points: 10,
  }
];
