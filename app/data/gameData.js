// This file will store the questions, options, and answers for the game.

export const gameQuestions = [
  {
    id: 1,
    question: 'Which is a herbivorous animal?',
    options: [
      { id: 'a', name: 'Lion', image: require('../../assets/images/games/lion.jpg') },
      { id: 'b', name: 'Cow', image: require('../../assets/images/games/cow.jpg') },
      { id: 'c', name: 'Dog', image: require('../../assets/images/games/dog.png') },
    ],
    correctAnswer: 'Cow',
    shadowImage: require('../../assets/images/games/cow_shadow.png'),
    explanation: 'Correct! The cow is a herbivore, which means it primarily eats plants.',
    incorrectExplanation: 'Not quite. Lions and dogs are carnivores or omnivores, not herbivores.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 2,
    question: 'Which animal is known as the "King of the Jungle"?',
    options: [
        { id: 'a', name: 'Dog', image: require('../../assets/images/games/dog.png') },
        { id: 'b', name: 'Cow', image: require('../../assets/images/games/cow.jpg') },
        { id: 'c', name: 'Lion', image: require('../../assets/images/games/lion.jpg') },
    ],
    correctAnswer: 'Lion',
    shadowImage: require('../../assets/images/games/lion_shadow.jpg'),
    explanation: 'Correct! The lion is famously called the "King of the Jungle."',
    incorrectExplanation: 'Not quite. While strong, the cow and dog are not known as the king.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 3,
    question: 'Which one is a fruit you can eat?',
    options: [
      { id: 'a', name: 'Apple', image: require('../../assets/images/games/apple.jpg') },
      { id: 'b', name: 'Car', image: require('../../assets/images/games/car.jpg') },
      { id: 'c', name: 'Ball', image: require('../../assets/images/games/ball.jpg') },
    ],
    correctAnswer: 'Apple',
    shadowImage: require('../../assets/images/games/apple_shadow.png'),
    explanation: 'Yes! An apple is a yummy fruit.',
    incorrectExplanation: 'Not quite. That is not a fruit.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 4,
    question: 'Which one do you wear on your feet?',
    options: [
        { id: 'a', name: 'Hat', image: require('../../assets/images/games/hat.png') },
        { id: 'b', name: 'Shirt', image: require('../../assets/images/games/shirt.png') },
        { id: 'c', name: 'Shoes', image: require('../../assets/images/games/shoes.jpg') },
    ],
    correctAnswer: 'Shoes',
    shadowImage: require('../../assets/images/games/shoes_shadow.jpg'),
    explanation: 'Correct! We wear shoes to protect our feet.',
    incorrectExplanation: 'That doesn\'t go on your feet. Try again!',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 5,
    question: 'Which one is a circle?',
    options: [
        { id: 'a', name: 'Square', image: require('../../assets/images/games/square.png') },
        { id: 'b', name: 'Circle', image: require('../../assets/images/games/circle.png') },
        { id: 'c', name: 'Triangle', image: require('../../assets/images/games/triangle.png') },
    ],
    correctAnswer: 'Circle',
    shadowImage: require('../../assets/images/games/circle_shadow.jpg'),
    explanation: 'Perfect! That shape is a circle, like a ball.',
    incorrectExplanation: 'That is a different shape. Look for the one that is round.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 6,
    question: 'Which of these can fly?',
    options: [
      { id: 'a', name: 'Bird', image: require('../../assets/images/games/bird.jpg') },
      { id: 'b', name: 'Fish', image: require('../../assets/images/games/fish.jpg') },
      { id: 'c', name: 'Dog', image: require('../../assets/images/games/dog.png') },
    ],
    correctAnswer: 'Bird',
    shadowImage: require('../../assets/images/games/bird_shadow.png'),
    explanation: 'That\'s right! Birds have wings to fly high in the sky.',
    incorrectExplanation: 'Not quite. That animal lives on land or in water.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 7,
    question: 'Which one do you use to brush your teeth?',
    options: [
        { id: 'a', name: 'Spoon', image: require('../../assets/images/games/spoon.jpg') },
        { id: 'b', name: 'Toothbrush', image: require('../../assets/images/games/toothbrush.jpg') },
        { id: 'c', name: 'Pencil', image: require('../../assets/images/games/pencil.png') },
    ],
    correctAnswer: 'Toothbrush',
    shadowImage: require('../../assets/images/games/toothbrush_shadow.png'),
    explanation: 'Yes! We use a toothbrush to keep our teeth clean and healthy.',
    incorrectExplanation: 'That is not used for brushing teeth. Try again!',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 8,
    question: 'Which animal says "Moo"?',
    options: [
        { id: 'a', name: 'Cat', image: require('../../assets/images/games/cat.png') },
        { id: 'b', name: 'Rooster', image: require('../../assets/images/games/rooster.jpg') },
        { id: 'c', name: 'Cow', image: require('../../assets/images/games/cow.jpg') },
    ],
    correctAnswer: 'Cow',
    shadowImage: require('../../assets/images/games/cow_shadow.png'),
    explanation: 'Correct! A cow says "Moo".',
    incorrectExplanation: 'That animal makes a different sound. Listen for "Moo".',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 9,
    question: 'Which one is a healthy snack?',
    options: [
        { id: 'a', name: 'Apple', image: require('../../assets/images/games/apple.jpg') },
        { id: 'b', name: 'Candy', image: require('../../assets/images/games/candy.jpg') },
        { id: 'c', name: 'Chips', image: require('../../assets/images/games/chips.jpg') },
    ],
    correctAnswer: 'Apple',
    shadowImage: require('../../assets/images/games/apple_shadow.png'),
    explanation: 'Great choice! Apples are healthy and delicious.',
    incorrectExplanation: 'That is a treat, not a healthy snack. Look for the fruit!',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 10,
    question: 'Where do you sleep at night?',
    options: [
        { id: 'a', name: 'Chair', image: require('../../assets/images/games/chair.jpg') },
        { id: 'b', name: 'Bed', image: require('../../assets/images/games/bed.jpg') },
        { id: 'c', name: 'Table', image: require('../../assets/images/games/table.png') },
    ],
    correctAnswer: 'Bed',
    shadowImage: require('../../assets/images/games/bed_shadow.png'),
    explanation: 'Yes! We sleep in a comfy bed to rest.',
    incorrectExplanation: 'That is not a place for sleeping. Find the soft bed.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 11,
    question: 'Which one do you use to write?',
    options: [
        { id: 'a', name: 'Pencil', image: require('../../assets/images/games/pencil.png') },
        { id: 'b', name: 'Spoon', image: require('../../assets/images/games/spoon.jpg') },
        { id: 'c', name: 'Ball', image: require('../../assets/images/games/ball.jpg') },
    ],
    correctAnswer: 'Pencil',
    shadowImage: require('../../assets/images/games/pencil_shadow.png'),
    explanation: 'Perfect! You use a pencil to write and draw.',
    incorrectExplanation: 'That is not for writing. Look for the pointy one!',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
  {
    id: 12,
    question: 'What do you use when it rains?',
    options: [
        { id: 'a', name: 'Sunglasses', image: require('../../assets/images/games/sunglasses.jpg') },
        { id: 'b', name: 'Scarf', image: require('../../assets/images/games/scarf.png') },
        { id: 'c', name: 'Umbrella', image: require('../../assets/images/games/umbrella.jpg') },
    ],
    correctAnswer: 'Umbrella',
    shadowImage: require('../../assets/images/games/umbrella_shadow.jpg'),
    explanation: 'Correct! An umbrella keeps you dry from the rain.',
    incorrectExplanation: 'That won\'t help in the rain. Find the one that blocks water.',
    correctSound: require('../../assets/audio/correct.mp3'),
    incorrectSound: require('../../assets/audio/incorrect.mp3'),
    points: 10
  },
];

export default { gameQuestions };