import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './colors';

const ThemeContext = createContext({
  dark: false,
  colors: lightTheme,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const colors = dark ? darkTheme : lightTheme;
  const toggleTheme = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);