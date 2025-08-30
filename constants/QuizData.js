export const ClothData = [
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
    resize: "cover",
    points: 50,
  },
  {
    id: 'q2',
    image: require('../assets/images/choiceBoards/rain.jpg'),
    title: 'A boy wearing raincoat in rainy weather.',
    description: 'Learn about the animal kingdom!',
    question: 'What do we wear when it rains?',
    options: [
      { label: 'Raincoat', value: 'Raincoat' },
      { label: 'T-Shirt', value: 'T-Shirt' },
      { label: 'Sunglasses', value: 'Sunglasses' },
      { label: 'Hat', value: 'Hat' },
    ],
    correctAnswer: 'Raincoat',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: "cover",
    points: 50,
  },
  {
    id: 'q3',
    image: require('../assets/images/choiceBoards/winter.jpg'),
    title: 'We should wear sweaters, gloves , scarf in winter to stay warm and comfortable.',
    description: 'Learn about the animal kingdom!',
    question: 'What do we wear around our neck to stay warm?',
    options: [
      { label: 'Belt', value: 'Belt' },
      { label: 'Scarf', value: 'Scarf' },
      { label: 'Necklace', value: 'Necklace' },
      { label: 'Rope', value: 'Rope' },
    ],
    correctAnswer: 'Scarf',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: "cover",
    points: 50,
  }
];

export const roadSafetyData = [
  {
    id: 'q1',
    image: require('../assets/images/choiceBoards/traffic.jpg'),
    title: 'Red traffic light means STOP. We must wait and not cross the road.',
    description: 'Learn road safety rules!',
    question: 'What should we do when the traffic light is red?',
    options: [
      { label: 'Run fast', value: 'Run fast' },
      { label: 'Stop', value: 'Stop' },
      { label: 'Walk quickly', value: 'Walk quickly' },
      { label: 'Drive faster', value: 'Drive faster' }
    ],
    correctAnswer: 'Stop',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: "contain",
    points: 50,
  },

  {
    id: 'q3',
    image: require('../assets/images/choiceBoards/no-parking.jpg'),
    title: 'This is a No Parking sign. We should not park vehicles where this sign is shown.',
    description: 'Learn road safety symbols!',
    question: 'What does the No Parking sign mean?',
    options: [
      { label: 'You can park here', value: 'You can park here' },
      { label: 'No parking allowed', value: 'No parking allowed' },
      { label: 'Park anytime', value: 'Park anytime' },
      { label: 'Parking for cars only', value: 'Parking for cars only' }
    ],
    correctAnswer: 'No parking allowed',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: "contain",
    points: 50,
  },
  {
    id: 'q2',
    image: require('../assets/images/choiceBoards/traffic.jpg'),
    title: 'Green light means GO. It is safe to walk or drive.',
    description: 'Learn road safety rules!',
    question: 'What should we do when the traffic light turns green?',
    options: [
      { label: 'Go', value: 'Go' },
      { label: 'Stop', value: 'Stop' },
      { label: 'Wait', value: 'Wait' },
      { label: 'Sleep', value: 'Sleep' }
    ],
    correctAnswer: 'Go',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: "contain",
    points: 50,
  }
]

export const FoodData = [
  {
    id: 'q1',
    image: require('../assets/images/choiceBoards/fruits.jpg'),
    title: 'Eating fruits keeps us healthy.',
    description: 'Learn about healthy habits!',
    question: 'What should we eat to stay healthy?',
    options: [
      { label: 'Fruits', value: 'Fruits' },
      { label: 'Burger', value: 'Burger' },
      { label: 'Pasta', value: 'Pasta' },
      { label: 'Chocolates', value: 'Chocolates' }
    ],
    correctAnswer: 'Fruits',
    correctSound: require('../assets/audio/correct.mp3'),
    incorrectSound: require('../assets/audio/incorrect.mp3'),
    resize: 'contain',
    points: 50,
  },

  {
  id: 'q2',
  image: require('../assets/images/choiceBoards/milk.jpg'),
  title: 'Drinking milk helps us grow strong and stay healthy.',
  description: 'Learn about good food habits!',
  question: 'Why should we drink milk?',
  options: [
    { label: 'To stay healthy', value: 'To stay healthy' },
    { label: 'To fall asleep', value: 'To fall asleep' },
    { label: 'To avoid studying', value: 'To avoid studying' },
    { label: 'To watch TV', value: 'To watch TV' }
  ],
  correctAnswer: 'To stay healthy',
  correctSound: require('../assets/audio/correct.mp3'),
  incorrectSound: require('../assets/audio/incorrect.mp3'),
  resize: "contain",
  points: 50,
},
 {
  id: 'q3',
  image: require('../assets/images/choiceBoards/thrown-food.jpg'), // Update path/image as needed
  title: 'Picking up thrown food is not a good habit.',
  description: 'Learn about clean and healthy habits!',
  question: 'Should we eat food that has fallen on the ground?',
  options: [
    { label: 'No, it is dirty', value: 'No, it is bad habit' },
    { label: 'Yes, it is tasty', value: 'Yes, it is tasty' },
    { label: 'Yes, it is fun', value: 'Yes, it is fun' },
    { label: 'Maybe, if no one sees', value: 'Maybe, if no one sees' }
  ],
  correctAnswer: 'No, it is bad habit',
  correctSound: require('../assets/audio/correct.mp3'),
  incorrectSound: require('../assets/audio/incorrect.mp3'),
  resize: 'contain',
  points: 50,
}
]



