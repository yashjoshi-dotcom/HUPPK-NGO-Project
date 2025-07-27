
export const emotionsChoiceQuestions={
    question: "How are you feeling today?",
    description: "Choose an emotion that best describes how you feel right now.",
    options: [
    {
      label: "Happy",
      image: require('../../assets/images/emotionalChoices/happy.jpg'),
      followUp: {
        question: "What made you happy?",
        description: "Think about something that made you smile or feel good today.",
        options: [
          {
            label: "Family",
            image: require('../../assets/images/emotionalChoices/family.jpg'),
            value: "family",
            followUp: {
              question: "What about your family made you happy?",
              description: "Was it something they did or said?",
              options: [
                {
                  label: "Love",
                  image: require('../../assets/images/emotionalChoices/love.jpg'),
                  value: "love",
                  followUp: {
                    question: "How did you feel loved?",
                    description: "Think about a specific moment when you felt loved.",
                    options: [
                      {
                        label: "Hugs",
                        image: require('../../assets/images/emotionalChoices/hugs.jpg'),
                        value: "hugs",
                        result: {
                          title: "That’s wonderful!",
                          image:require('../../assets/images/emotionalChoices/wonderful.jpg'),
                          description: "Hugs make us feel warm and safe. Keep spending time with your family and share how much you love them too!."
                        }
                      },
                      {
                        label: "Kind Words",
                        image: require('../../assets/images/emotionalChoices/kind.jpg'),
                        value: "kind_words",
                        result: {
                          title: "Kindness matters!",
                          image:require("../../assets/images/emotionalChoices/worldKindness.jpg"),
                          description: "Remember those kind words and say kind things back. It spreads happiness!"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      label: "Sad",
      image: require('../../assets/images/emotionalChoices/sad.jpg'),
      followUp: {
        question: "Why are you sad?",
        description: "It’s okay to feel sad sometimes. Let’s talk about it.",
        options: [
          {
            label: "Got Hurt",
            image: require('../../assets/images/emotionalChoices/gotHurt.jpg'),
            value: "hurt",
            followUp: {
              question: "How did you get hurt?",
              description: "Did you fall down or did someone hurt you?",
              options: [
                {
                  label: "Fell Down",
                  image: require('../../assets/images/emotionalChoices/fellDown.jpg'),
                  value: "fell",
                  result: {
                    title: "Ouch! That must have hurt.",
                    image: require('../../assets/images/emotionalChoices/tellTeacher.jpg'),
                    description: "It’s okay to feel sad when we get hurt. If it still hurts, talk to your teacher or parent. They care about you."
                  }
                },
                {
                  label: "Someone Hit",
                  image: require('../../assets/images/emotionalChoices/hit.jpg'),
                  value: "hit",
                  result: {
                    title: "That’s not nice.",
                    image: require('../../assets/images/emotionalChoices/askHelp.jpg'),
                    description: "Tell an adult if someone hurt you. You deserve to be safe and respected."
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
        label: "Surprised",
        image: require('../../assets/images/emotionalChoices/surprised.jpg'),
        followUp: {
            question: "What surprised you?",
            description: "Surprises can be fun or a bit scary. Let’s see what happened.",
            options: [
                {
                    label: "Unexpected Gift",
                    image: require('../../assets/images/emotionalChoices/gift.jpg'),
                    value: "gift",
                    result: {
                        title: "How thoughtful!",
                        image: require('../../assets/images/emotionalChoices/gotGift.jpg'),
                        description: "It's always nice to receive a gift. Remember to thank the person who gave it to you!"
                    }
                },
                {
                    label: "Sudden Noise",
                    image: require('../../assets/images/emotionalChoices/suddenNoise.jpg'),
                    value: "noise",
                    result: {
                        title: "That can be startling!",
                        image: require('../../assets/images/emotionalChoices/quiet.jpg'),
                        description: "If a noise surprises you, take a deep breath and try to relax. It's okay to feel startled."
                    }
                }
            ]
        }
    },
   {
  label: "Cold",
  image: require('../../assets/images/emotionalChoices/cold.jpeg'),
  followUp:{
    question:"Is your teeth chattering?",
    description:"Feeling cold can make us shiver. Let’s see how you feel.",
    options:[
      {
        label: "Yes",
        image: require('../../assets/images/emotionalChoices/yes.jpg'),
        value: "yes",
        result: {
          title: "Stay Warm!",
          image: require('../../assets/images/emotionalChoices/wearWarmCloths.jpg'),
          description: "Put on a warm jacket or blanket. It’s important to keep your body warm."
        }
      },
      {
        label: "No",
        image: require('../../assets/images/emotionalChoices/no.png'),
        value: "no",
        result: {
          title: "Good!",
          image: require('../../assets/images/emotionalChoices/wearCloths.jpg'),
          description: "If you’re not cold, that’s great! Just remember to dress warmly when it’s chilly outside."
        }
      }
    ]
  } 
}
    ]
}