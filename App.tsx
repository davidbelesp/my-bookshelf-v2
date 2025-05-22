import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import RootNavigator from 'navigation/RootNavigator';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
