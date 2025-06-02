// theme-context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from './colors';

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
  colors: typeof lightTheme;
};

const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  toggleTheme: () => {},
  colors: lightTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      setDark(value === 'dark');
    });
  }, []);

  const toggleTheme = () => {
    const newValue = !dark;
    setDark(newValue);
    AsyncStorage.setItem('theme', newValue ? 'dark' : 'light');
  };

  const colors = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);