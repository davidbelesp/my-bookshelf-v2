import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Button } from 'react-native';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button title="⚙️" onPress={() => navigation.navigate('Settings')} />
          ),
        })}
      />
      <Stack.Screen name="Books" component={BookListScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}