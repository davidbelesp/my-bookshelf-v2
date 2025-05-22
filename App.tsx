import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import RootNavigator from 'navigation/RootNavigator';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
