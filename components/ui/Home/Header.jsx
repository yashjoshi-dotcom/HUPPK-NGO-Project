import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useThemeContext';

// --- ASSET DEFINITIONS ---
const landscapeBg = { uri: 'https://img.freepik.com/free-vector/gradient-mountain-landscape_52683-77407.jpg' };
const avatar = require('../../../assets/images/image-removebg-preview.png');
// --------------------------

// --- ADJUSTABLE PARAMETERS ---
const HEADER_HEIGHT = 60; // % of viewport height (adjust between 60-70)
const AVATAR_SIZE = 318; // Size in rem units (try values between 40-52)
const TOP_SPACING = 22; // % of header height (adjust between 10-15)
const AVATAR_SECTION_HEIGHT = 55; // % of header height (adjust between 45-55)
const GREEN_STRIP_HEIGHT = 1; // % of header height (adjust between 5-10)
// ----------------------------

export default function Header() {
  const [displayedScore, setDisplayedScore] = useState(0);
  const targetScore = 25982;
  const { theme, toggleTheme } = useTheme();

  const buttonBgClass = theme.mode === 'calming' 
    ? 'bg-teal-500' 
    : 'bg-black/20';

  useEffect(() => {
    const duration = 1200;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const increment = targetScore / totalFrames;
    let currentScore = 0;

    const timer = setInterval(() => {
      currentScore += increment;
      if (currentScore >= targetScore) {
        setDisplayedScore(targetScore);
        clearInterval(timer);
      } else {
        setDisplayedScore(Math.round(currentScore));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ height: `${HEADER_HEIGHT}vh` }} className="w-full overflow-hidden">
      {/* Layer 1: The Background Image */}
      <Image
        source={landscapeBg}
        className="absolute top-0 left-0 w-full h-full"
        resizeMode="cover"
      />

      <View className="w-full h-full flex">
        {/* Top spacing */}
        <View style={{ height: `${TOP_SPACING}%` }} />
        
        {/* Avatar Section - Centered */}
        <View style={{ height: `${AVATAR_SECTION_HEIGHT}%` }} className="items-center justify-center">
          <Image
            source={avatar}
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            resizeMode="contain"
          />
        </View>
        
        {/* Points Section with Simple Glow Effect - Below Avatar */}
        <View className="items-center mt-1">
          {/* Points text with glow effect */}
          <Text 
            className="text-white text-5xl font-extrabold"
            style={{
              textShadowColor: 'rgba(255, 255, 255, 0.9)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10,
            }}
          >
            {displayedScore.toLocaleString()}
          </Text>
          
          <Text 
            className="text-white/80 text-lg font-semibold"
            style={{
              textShadowColor: 'rgba(255, 255, 255, 0.7)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 5,
            }}
          >
            COS coins collected
          </Text>
        </View>
        
        {/* Green strip at the bottom to represent landscape end */}
        <View 
          style={{ height: `${GREEN_STRIP_HEIGHT}%` }} 
          className="bg-[#8BC34A]/80 mt-auto"
        />
      </View>

      {/* Layer 4: The Headset Button */}
      <View className="absolute top-5 right-5">
        <TouchableOpacity
          onPress={toggleTheme}
          className={`w-11 h-11 rounded-full justify-center items-center ${buttonBgClass}`}
        >
          <Ionicons
            name={theme.mode === 'calming' ? 'headset' : 'headset-outline'}
            size={26}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}