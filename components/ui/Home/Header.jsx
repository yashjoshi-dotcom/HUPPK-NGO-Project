import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../hooks/useThemeContext';
import { Colors } from '../../../constants/Colors';

// --- ASSET DEFINITIONS ---
const landscapeBg = require('../../../assets/images/gradient-mountain-landscape_52683-77407.png');
const avatar = require('../../../assets/images/image-removebg-preview.png');
// --------------------------

// Calculate header height in pixels using Dimensions
const screenHeight = Dimensions.get('window').height;
const HEADER_HEIGHT = screenHeight * 0.55; // 65% of the screen height

export default function Header() {
  const [displayedScore, setDisplayedScore] = useState(0);
  const targetScore = 25982;
  const { theme, toggleTheme, setTheme } = useTheme();
  const isFocused = useIsFocused();

  const buttonBgClass = theme.mode === 'calming' 
    ? 'bg-teal-500' 
    : 'bg-black/20';

  useEffect(() => {
    if (!isFocused && theme.mode === 'calming') {
      setTheme(Colors.light); // 👈 resets back to light theme
    }
  }, [isFocused]);
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
    <View style={{ height: HEADER_HEIGHT }}>
      {/* Layer 1: The Background Image */}
      <Image
        source={landscapeBg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      {/* Layer 2: The Avatar (Positioned higher) */}
      <View className="absolute left-0 right-0 items-center" style={{ top: '30%' }}>
        <Image
          source={avatar}
          className="w-60 h-60 top-1"
          resizeMode="contain"
        />
      </View>
      
      {/* Layer 3: The Score Text (Positioned lower, so it appears below avatar) */}
      <View className="absolute left-0 right-0 items-center" style={{ top: '78%' }}>
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
          className="text-white/90 text-lg font-semibold"
          style={{
            textShadowColor: 'rgba(255, 255, 255, 0.7)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 5,
          }}
        >
          COS coins collected
        </Text>
      </View>

      {/* Layer 4: The Headset Button */}
      <View className="absolute top-5 right-5 mt-5">
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