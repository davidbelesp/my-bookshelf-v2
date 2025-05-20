import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
// Importing the screens
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddBookScreen from '../screens/AddBookScreen';
import EditBookScreen from 'screens/EditBookScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors, dark } = useTheme();

  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.main,
        },
        headerTitleStyle: {
          color: colors.mainWhite,
        },
        headerTintColor: colors.mainWhite,
      }}>

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Settings')} className="mr-3 p-2">
              <MaterialIcons name="settings" size={24} color="white" />
            </Pressable>
          ),
        })}
      />

      <Stack.Screen name="AddBook" component={AddBookScreen} />
      <Stack.Screen name="Books" component={BookListScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditBook" component={EditBookScreen} />
    </Stack.Navigator>
  );
}
