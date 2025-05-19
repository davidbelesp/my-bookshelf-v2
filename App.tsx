import { NavigationContainer } from '@react-navigation/native';
import './global.css';
import RootNavigator from 'navigation/RootNavigator';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function ThemedStatusBar() {
  const { dark } = useTheme();
  return <StatusBar style={dark ? 'light' : 'dark'} />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
