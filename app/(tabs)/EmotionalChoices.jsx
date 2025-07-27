import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import {emotionsChoiceQuestions } from '../data/emotionalChoices';

export default function EmotionalChoices () {
  const [stack, setStack] = useState([{ node: emotionsChoiceQuestions }]);
  const current = stack[stack.length - 1]?.node;
  const handleOptionSelect = (option) => {
    if (option?.result) {
      setStack([...stack, { node: option.result, isResult: true }]);
    } else if (option?.followUp) {
      setStack([...stack, { node: option.followUp }]);
    }
  };
  const handleRestart = () => {
    setStack([{ node: emotionsChoiceQuestions }]);
  };

  const renderOptions = (options) => {
    return (
      <View className="flex-row flex-wrap justify-center gap-4 mb-6">
        {options?.map((option, idx) => {
          return (
          <TouchableOpacity
          key={idx}
          activeOpacity={0.85}
          onPress={() => handleOptionSelect(option)}
          className="bg-transparent border-2 border-orange-500 rounded-lg p-4 w-50 h-50 flex items-center justify-center"
        >
          {option?.image && (
            <View className="w-40 h-40 mb-3 overflow-hidden items-center justify-center">
              <Image
                source={option.image}
                resizeMode="contain"
                style={{ width: '100%', height: '100%' }}
                onError={(error) => console.warn('Image failed to load', option.image, error)}
                accessibilityLabel={option.label}
              />
            </View>
          )}
          <Text className="text-orange-600 text-lg font-semibold text-center">
            {option?.label}
            </Text>
          </TouchableOpacity>
          )
        })}    
    </View>
    )
};

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <View className="items-center">
        {stack[stack.length - 1]?.isResult ? (
          <>
            {current?.image && (
              <View className="w-40 h-40 mb-3 overflow-hidden items-center justify-center">
                <Image
                  source={current?.image}
                  accessibilityLabel={current?.title}
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                  onError={(error) => console.warn('Image failed to load', current?.image, error)}
                />
              </View>
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
            {renderOptions(current?.options)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};
