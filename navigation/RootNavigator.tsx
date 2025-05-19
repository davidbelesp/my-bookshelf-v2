import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { RootStackParamList } from '../types/navigation';
// Importing the screens
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddBookScreen from '../screens/AddBookScreen';
import EditBookScreen from 'screens/EditBookScreen';

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
      <Stack.Screen name='AddBook' component={AddBookScreen} />
      <Stack.Screen name="Books" component={BookListScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditBook" component={EditBookScreen} />
    </Stack.Navigator>
  );
}