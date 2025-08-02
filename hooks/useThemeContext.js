// context/ThemeContext.js
import React, { createContext, useContext, useState } from 'react';
import { Colors } from '../constants/Colors';
import { useCalmingSound } from './useCalmingSound';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(Colors.light);
  const { toggleSound } = useCalmingSound();
  const toggleTheme = () => {
    setThemeState((prev) => (prev.mode === 'light' ? Colors.calming : Colors.light));
    toggleSound();
  };

  const setTheme = (newTheme) => {
    if (theme.mode !== newTheme.mode) {
      toggleSound();
    }
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
