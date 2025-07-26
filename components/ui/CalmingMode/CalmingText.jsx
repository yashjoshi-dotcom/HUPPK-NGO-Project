import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export const CalmingText=()=> {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState('Breathe In');

  useEffect(() => {
    const loop = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setMessage((prev) => (prev === 'Breathe In' ? 'Breathe Out' : 'Breathe In'));
        loop(); // repeat
      });
    };

    loop();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        {message}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: '300',
    color: '#6ab7a8', // calming seafoam
  },
});
