import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import EmotionTree from '../data/emotionbasedQuestions.json'; // Assume your JSON tree is exported here

export default function EmotionalChoices () {
  const [stack, setStack] = useState([{ node: EmotionTree }]);
  const current = stack[stack.length - 1]?.node;
  const handleOptionSelect = (option) => {
    if (option?.result) {
      setStack([...stack, { node: option.result, isResult: true }]);
    } else if (option?.followUp) {
      setStack([...stack, { node: option.followUp }]);
    }
  };

  const handleRestart = () => {
    setStack([{ node: EmotionTree }]);
  };

  const renderOptions = (options) => (
    <View className="flex-row flex-wrap justify-center gap-4 mb-6">
      {options?.map((option, idx) => (
        <TouchableOpacity
          key={idx}
          activeOpacity={0.85}
          onPress={() => handleOptionSelect(option)}
          style={{
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderColor: '#FFA500',
            borderRadius: 16,
            margin: 8,
            padding: 12,
            alignItems: 'center',
          }}
        >
          {option?.image && (
            <Image
              source={{ uri: option.image }}
              style={{ width: 72, height: 72, marginBottom: 12 }}
              resizeMode="contain"
            />
          )}
          <Text style={{ color: '#FFA500', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
            {option?.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center">
        {stack[stack.length - 1]?.isResult ? (
          <>
            {current?.image && (
              <Image
                source={{ uri: current.image }}
                style={{ width: 150, height: 150, marginBottom: 16 }}
                resizeMode="contain"
              />
            )}
            <Text className="text-2xl font-bold text-green-600 mb-4">
              {current?.title}
            </Text>
            <Text className="text-lg text-gray-700 text-center mb-6">
              {current?.description || 'Thank you for sharing your feelings with us!'}
            </Text>
            <TouchableOpacity
              className="bg-gray-700 px-6 py-3 rounded-full"
              onPress={handleRestart}
            >
              <Text className="text-white text-lg">Start Over</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View className="flex-column gap-2 ">
            <Text className="text-3xl font-bold mb-2 text-center text-orange-600">
              {current?.question || 'How are you feeling today?'}
            </Text>
            {current?.description && (
              <Text className="text-lg text-black mb-4 text-center">
                {current?.description}
              </Text>
            )}
            {renderOptions(current?.emotions || current?.options)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
