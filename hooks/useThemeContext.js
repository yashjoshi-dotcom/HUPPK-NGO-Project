// context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { Colors } from '../constants/Colors';
import { useCalmingSound } from './useCalmingSound';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Colors.light);
  const { toggleSound } = useCalmingSound();
  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === 'light' ? Colors.calming : Colors.light));
    toggleSound();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
